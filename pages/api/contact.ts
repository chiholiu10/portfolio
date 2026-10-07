import type { NextApiRequest, NextApiResponse } from "next";
import {
  contactRequestSchema,
  normalizeContactRequest,
} from "../../lib/contact/validation";
import { hashValue } from "../../lib/career-agent/privacy";
import { consumeDistributedRateLimit } from "../../lib/career-agent/rate-limit";

type ApiResponse =
  | { ok: true; requestId: string }
  | { error: string; code: string; requestId?: string };

const isAllowedOrigin = (request: NextApiRequest) => {
  const { origin } = request.headers;
  if (!origin) return true;

  const allowedOrigins = (process.env.CONTACT_ALLOWED_ORIGINS || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  try {
    return (
      new URL(origin).host === request.headers.host ||
      allowedOrigins.includes(origin)
    );
  } catch {
    return false;
  }
};

const getClientAddress = (request: NextApiRequest) => {
  const forwarded =
    request.headers["x-vercel-forwarded-for"] ||
    request.headers["x-forwarded-for"];
  const value = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  return value?.split(",")[0]?.trim() || request.socket.remoteAddress || "unknown";
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const sendNotification = async (
  submission: ReturnType<typeof normalizeContactRequest>,
  requestId: string,
) => {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_NOTIFICATION_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) return;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: submission.email,
      subject: `Portfolio contact: ${submission.subject}`,
      html: `<h1>New portfolio contact</h1><p><strong>Name:</strong> ${escapeHtml(submission.name)}</p><p><strong>Email:</strong> ${escapeHtml(submission.email)}</p><p><strong>Company:</strong> ${escapeHtml(submission.company || "Not provided")}</p><p><strong>Request ID:</strong> ${requestId}</p><p>${escapeHtml(submission.message).replace(/\n/g, "<br>")}</p>`,
    }),
  });

  if (!response.ok) throw new Error("Notification delivery failed.");
};

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<ApiResponse>,
) {
  const requestId = crypto.randomUUID();
  response.setHeader("Cache-Control", "no-store, max-age=0");
  response.setHeader("X-Content-Type-Options", "nosniff");
  response.setHeader("Referrer-Policy", "no-referrer");

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

  const parsed = contactRequestSchema.safeParse(request.body);
  if (!parsed.success) {
    return response.status(400).json({
      error: "Please check the form and try again.",
      code: "INVALID_REQUEST",
    });
  }

  const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    return response.status(503).json({
      error: "Contact is temporarily unavailable.",
      code: "NOT_CONFIGURED",
      requestId,
    });
  }

  const secret = process.env.CONTACT_HASH_SECRET || serviceRoleKey;
  const clientAddressHash = await hashValue(getClientAddress(request), secret);

  try {
    const burst = await consumeDistributedRateLimit(
      `contact:burst:${clientAddressHash}`,
      2,
      60_000,
    );
    const hourly = await consumeDistributedRateLimit(
      `contact:hour:${clientAddressHash}`,
      5,
      3_600_000,
    );

    if (!burst.allowed || !hourly.allowed) {
      const retryAfter = Math.max(
        burst.retryAfterSeconds,
        hourly.retryAfterSeconds,
        1,
      );
      response.setHeader("Retry-After", String(retryAfter));
      return response.status(429).json({
        error: "Too many requests. Please try again later.",
        code: "RATE_LIMITED",
        requestId,
      });
    }
  } catch {
    return response.status(503).json({
      error: "Contact is temporarily unavailable.",
      code: "RATE_LIMIT_UNAVAILABLE",
      requestId,
    });
  }

  const submission = normalizeContactRequest(parsed.data);
  const saveResponse = await fetch(`${supabaseUrl}/rest/v1/contact_submissions`, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      request_id: requestId,
      name: submission.name,
      email: submission.email,
      company: submission.company || null,
      subject: submission.subject,
      message: submission.message,
      consented_at: new Date().toISOString(),
      client_address_hash: clientAddressHash,
      user_agent: request.headers["user-agent"]?.slice(0, 300) || null,
    }),
  });

  if (!saveResponse.ok) {
    return response.status(502).json({
      error: "Your message could not be saved.",
      code: "SUBMISSION_NOT_SAVED",
      requestId,
    });
  }

  try {
    await sendNotification(submission, requestId);
  } catch {
    // The submission is safely stored. Email delivery must not create duplicates.
  }

  return response.status(201).json({ ok: true, requestId });
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "8kb",
    },
  },
};
