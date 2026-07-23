import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

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
  | { answer: string; sessionId: string }
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

const extractAnswer = (payload: unknown) => {
  if (!payload || typeof payload !== "object") return null;

  const result = payload as { text?: unknown; json?: unknown };

  if (typeof result.text === "string" && result.text.trim()) {
    return result.text.trim().slice(0, 6000);
  }

  if (typeof result.json === "string" && result.json.trim()) {
    return result.json.trim().slice(0, 6000);
  }

  if (result.json && typeof result.json === "object") {
    return JSON.stringify(result.json).slice(0, 6000);
  }

  return null;
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

  const apiUrl = process.env.FLOWISE_API_URL?.replace(/\/$/, "");
  const flowId = process.env.FLOWISE_FLOW_ID;
  const apiKey = process.env.FLOWISE_API_KEY;

  if (!apiUrl || !flowId || !apiKey) {
    return response.status(503).json({
      error: "The career assistant has not been configured yet.",
      code: "NOT_CONFIGURED",
    });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30_000);

  try {
    const flowiseResponse = await fetch(
      `${apiUrl}/api/v1/prediction/${encodeURIComponent(flowId)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: parsed.data.message,
          streaming: false,
          overrideConfig: {
            sessionId: parsed.data.sessionId,
          },
        }),
        signal: controller.signal,
      },
    );

    if (!flowiseResponse.ok) {
      return response.status(502).json({
        error: "The career assistant could not answer right now.",
        code: "UPSTREAM_ERROR",
      });
    }

    const payload: unknown = await flowiseResponse.json();
    const answer = extractAnswer(payload);

    if (!answer) {
      return response.status(502).json({
        error: "The career assistant returned an empty answer.",
        code: "EMPTY_RESPONSE",
      });
    }

    return response.status(200).json({
      answer,
      sessionId: parsed.data.sessionId,
    });
  } catch (error) {
    const timedOut = error instanceof Error && error.name === "AbortError";

    return response.status(502).json({
      error: timedOut
        ? "The response took too long. Please try again."
        : "The career assistant is currently unavailable.",
      code: timedOut ? "TIMEOUT" : "UNAVAILABLE",
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
