import { randomUUID } from "node:crypto";
import { setTimeout as delay } from "node:timers/promises";

/** Retry only connection failures before work reaches Python; never duplicate timed-out analyses. */
export async function requestMatcher(
  url: URL,
  token: string,
  body: string,
  requestId: string = randomUUID(),
) {
  const signal = AbortSignal.timeout(22_000);
  for (let attempt = 0; ; attempt++) {
    try {
      return await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Request-ID": requestId,
        },
        body,
        signal,
      });
    } catch (error) {
      const code = (error as { cause?: { code?: string } }).cause?.code;
      if (
        attempt ||
        signal.aborted ||
        !["ECONNREFUSED", "EAI_AGAIN"].includes(code || "")
      )
        throw error;
      await delay(200, undefined, { signal });
    }
  }
}

export function matcherFailureCategory(error: unknown) {
  const failure = error as { name?: string; cause?: { code?: string } };
  if (["TimeoutError", "AbortError"].includes(failure?.name || ""))
    return "timeout";
  if (failure?.cause?.code === "ECONNREFUSED") return "connection_refused";
  return "upstream_failure";
}

/** Deployment configuration is trusted; request Host headers never select the backend. */
export function matcherEndpoint(value: string, production: boolean): URL {
  const url = new URL(value);
  const hostname = url.hostname.toLowerCase().replace(/\.$/, "");
  const local =
    hostname === "localhost" ||
    hostname.endsWith(".localhost") ||
    /^127\./.test(hostname) ||
    ["[::1]", "[::ffff:7f00:1]", "0.0.0.0", "[::]", "matcher-api"].includes(
      hostname,
    );
  if (
    !["http:", "https:"].includes(url.protocol) ||
    url.username ||
    url.password ||
    (production && (url.protocol !== "https:" || local))
  ) {
    throw new Error("Invalid matcher endpoint configuration");
  }
  return new URL("/match", url);
}
