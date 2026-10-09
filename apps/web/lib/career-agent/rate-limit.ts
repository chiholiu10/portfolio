type RateLimitResult = {
  allowed: boolean;
  retryAfterSeconds: number;
};

export const consumeDistributedRateLimit = async (
  key: string,
  limit: number,
  windowMs: number,
): Promise<RateLimitResult> => {
  const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return { allowed: false, retryAfterSeconds: 60 };
  }

  const response = await fetch(
    `${supabaseUrl}/rest/v1/rpc/consume_career_agent_rate_limit`,
    {
      method: "POST",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        p_rate_key: key,
        p_request_limit: Math.max(1, Math.floor(limit)),
        p_window_seconds: Math.max(1, Math.ceil(windowMs / 1000)),
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Distributed rate limit is unavailable.");
  }

  const payload = (await response.json()) as Array<{
    allowed?: unknown;
    retry_after_seconds?: unknown;
  }>;
  const result = payload[0];

  if (
    typeof result?.allowed !== "boolean" ||
    typeof result.retry_after_seconds !== "number"
  ) {
    throw new Error("Distributed rate limit returned an invalid response.");
  }

  return {
    allowed: result.allowed,
    retryAfterSeconds: Math.max(0, result.retry_after_seconds),
  };
};
