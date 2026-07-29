import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import {
  answerCareerQuestion,
  isProviderQuotaError,
} from "../../lib/career-agent/gemini";
import { logCareerAgentMessage } from "../../lib/career-agent/history";

const stripUnsafeControlCharacters = (message: string) =>
  Array.from(message)
    .filter((character) => {
      const code = character.charCodeAt(0);
      return code === 9 || code === 10 || code === 13 || code >= 32;
    })
    .join("");

const requestSchema = z.object({
  message: z
    .string()
    .trim()
    .min(1)
    .max(1000)
    .transform(stripUnsafeControlCharacters)
    .refine((message) => message.trim().length > 0),
  sessionId: z
    .string()
    .trim()
    .min(8)
    .max(100)
    .regex(/^[a-zA-Z0-9_-]+$/),
});

type ApiResponse =
  | {
      answer: string;
      sessionId: string;
      chatId?: string;
      messageId?: string;
      contactOptions?: Array<"email" | "whatsapp">;
    }
  | { error: string; code: string };

type RateLimitEntry = { count: number; resetAt: number };

const rateLimitStore = new Map<string, RateLimitEntry>();

const getClientAddress = (request: NextApiRequest) => {
  const forwarded =
    request.headers["x-vercel-forwarded-for"] ||
    request.headers["x-forwarded-for"];
  const value = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  return (
    value?.split(",")[0]?.trim() || request.socket.remoteAddress || "unknown"
  );
};

const consumeRateLimit = (key: string) => {
  const now = Date.now();
  const configuredLimit = Number(process.env.CAREER_AGENT_RATE_LIMIT || 12);
  const configuredWindow = Number(
    process.env.CAREER_AGENT_RATE_WINDOW_MS || 60_000,
  );
  const limit = Number.isFinite(configuredLimit) ? configuredLimit : 12;
  const windowMs = Number.isFinite(configuredWindow)
    ? configuredWindow
    : 60_000;
  const current = rateLimitStore.get(key);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return { limited: false, retryAfterSeconds: 0 };
  }

  current.count += 1;
  return {
    limited: current.count > limit,
    retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
  };
};

const isAllowedOrigin = (request: NextApiRequest) => {
  const { origin } = request.headers;
  if (!origin) return true;

  const allowedOrigins = (process.env.CAREER_AGENT_ALLOWED_ORIGINS || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  try {
    const originHost = new URL(origin).host;
    return originHost === request.headers.host || allowedOrigins.includes(origin);
  } catch {
    return false;
  }
};

const extractContactOptions = (answer: string) => {
  const markerPattern = /\[\[contact_actions:([a-z,\s]+)\]\]/i;
  const match = answer.match(markerPattern);

  if (!match) {
    return { cleanAnswer: answer };
  }

  const contactOptions = match[1]
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(
      (value): value is "email" | "whatsapp" =>
        value === "email" || value === "whatsapp",
    );

  return {
    cleanAnswer: answer.replace(markerPattern, "").trim(),
    contactOptions: [...new Set(contactOptions)],
  };
};

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<ApiResponse>,
) {
  response.setHeader("Cache-Control", "no-store, max-age=0");
  response.setHeader("X-Content-Type-Options", "nosniff");

  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response
      .status(405)
      .json({ error: "Method not allowed.", code: "METHOD_NOT_ALLOWED" });
  }

  if (!request.headers["content-type"]?.includes("application/json")) {
    return response.status(415).json({
      error: "Content-Type must be application/json.",
      code: "UNSUPPORTED_MEDIA_TYPE",
    });
  }

  if (!isAllowedOrigin(request)) {
    return response.status(403).json({
      error: "Request origin is not allowed.",
      code: "ORIGIN_NOT_ALLOWED",
    });
  }

  const parsed = requestSchema.safeParse(request.body);

  if (!parsed.success) {
    return response.status(400).json({
      error: "Please enter a message of no more than 1,000 characters.",
      code: "INVALID_REQUEST",
    });
  }

  const clientAddress = getClientAddress(request);
  const ipLimit = consumeRateLimit(`ip:${clientAddress}`);

  if (ipLimit.limited) {
    response.setHeader("Retry-After", String(ipLimit.retryAfterSeconds));
    return response.status(429).json({
      error: "Too many messages. Please wait a moment and try again.",
      code: "RATE_LIMITED",
    });
  }

  if (
    !process.env.GEMINI_API_KEY ||
    !process.env.SUPABASE_URL ||
    !process.env.SUPABASE_SERVICE_ROLE_KEY
  ) {
    return response.status(503).json({
      error: "The career assistant has not been configured yet.",
      code: "NOT_CONFIGURED",
    });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30_000);

  try {
    await logCareerAgentMessage({
      sessionId: parsed.data.sessionId,
      role: "user",
      content: parsed.data.message,
      clientAddress,
    });

    const answer = await answerCareerQuestion(
      parsed.data.message,
      controller.signal,
    );

    const { cleanAnswer, contactOptions } = extractContactOptions(answer);
    const chatId = parsed.data.sessionId;
    const messageId = crypto.randomUUID();

    await logCareerAgentMessage({
      sessionId: parsed.data.sessionId,
      role: "assistant",
      content: cleanAnswer,
      flowiseChatId: chatId,
      flowiseMessageId: messageId,
      contactOptions,
    });

    return response.status(200).json({
      answer: cleanAnswer,
      sessionId: parsed.data.sessionId,
      ...(chatId ? { chatId } : {}),
      ...(messageId ? { messageId } : {}),
      ...(contactOptions?.length ? { contactOptions } : {}),
    });
  } catch (error) {
    const timedOut = error instanceof Error && error.name === "AbortError";
    const quotaExhausted = isProviderQuotaError(error);
    let errorMessage = "The career assistant is currently unavailable.";
    let errorCode = "UNAVAILABLE";

    if (quotaExhausted) {
      errorMessage = "The career assistant is temporarily unavailable.";
      errorCode = "QUOTA_EXHAUSTED";
    } else if (timedOut) {
      errorMessage = "The response took too long. Please try again.";
      errorCode = "TIMEOUT";
    }

    return response.status(quotaExhausted ? 503 : 502).json({
      error: errorMessage,
      code: errorCode,
    });
  } finally {
    clearTimeout(timeout);
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4kb",
    },
  },
};
