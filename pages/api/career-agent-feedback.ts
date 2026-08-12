import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { logCareerAgentFeedback } from "../../lib/career-agent/history";
import { hashValue } from "../../lib/career-agent/privacy";
import { consumeDistributedRateLimit } from "../../lib/career-agent/rate-limit";

const requestSchema = z.object({
  feedbackId: z.string().trim().min(1).max(200)
.optional(),
  sessionId: z.string().trim().min(8).max(100),
  chatId: z.string().trim().min(8).max(100),
  messageId: z.string().uuid(),
  rating: z.enum(["THUMBS_UP", "THUMBS_DOWN"]),
});

type ApiResponse =
  | { ok: true; feedbackId?: string }
  | { error: string; code: string };

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

const getClientAddress = (request: NextApiRequest) => {
  const forwarded =
    request.headers["x-vercel-forwarded-for"] ||
    request.headers["x-forwarded-for"];
  const value = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  return (
    value?.split(",")[0]?.trim() || request.socket.remoteAddress || "unknown"
  );
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
      error: "Invalid feedback payload.",
      code: "INVALID_REQUEST",
    });
  }

  if (
    process.env.CAREER_AGENT_HISTORY_ENABLED !== "true" ||
    !process.env.SUPABASE_URL ||
    !process.env.SUPABASE_SERVICE_ROLE_KEY
  ) {
    return response.status(503).json({
      error: "The career assistant has not been configured yet.",
      code: "NOT_CONFIGURED",
    });
  }

  const hashingSecret =
    process.env.CAREER_AGENT_HASH_SECRET ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    "";
  const clientAddressHash = await hashValue(
    getClientAddress(request),
    hashingSecret,
  );

  try {
    const rateLimit = await consumeDistributedRateLimit(
      `feedback:${clientAddressHash || "unknown"}`,
      30,
      60_000,
    );

    if (!rateLimit.allowed) {
      response.setHeader(
        "Retry-After",
        String(Math.max(1, rateLimit.retryAfterSeconds)),
      );
      return response.status(429).json({
        error: "Too many feedback requests.",
        code: "RATE_LIMITED",
      });
    }
  } catch {
    return response.status(503).json({
      error: "Feedback is temporarily unavailable.",
      code: "RATE_LIMIT_UNAVAILABLE",
    });
  }

  const feedbackId = await logCareerAgentFeedback({
    sessionId: parsed.data.sessionId,
    flowiseChatId: parsed.data.chatId,
    flowiseMessageId: parsed.data.messageId,
    flowiseFeedbackId: parsed.data.feedbackId,
    rating: parsed.data.rating,
  });

  if (!feedbackId) {
    return response.status(502).json({
      error: "Feedback could not be saved.",
      code: "FEEDBACK_NOT_SAVED",
    });
  }

  return response.status(200).json({
    ok: true,
    ...(feedbackId || parsed.data.feedbackId
      ? { feedbackId: feedbackId || parsed.data.feedbackId }
      : {}),
  });
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "2kb",
    },
  },
};
