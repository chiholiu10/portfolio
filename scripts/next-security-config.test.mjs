import assert from "node:assert/strict";
import { describe, it } from "node:test";
import nextConfig from "../apps/web/next.config.js";

const allPageHeaders = async () => {
  const rules = await nextConfig.headers();
  const pageRule = rules.find(({ source }) => source === "/:path*");
  assert.ok(pageRule, "the all-page security header rule must exist");
  return new Map(
    pageRule.headers.map(({ key, value }) => [key.toLowerCase(), value]),
  );
};

describe("Next.js production security configuration", () => {
  it("keeps framework disclosure disabled", () => {
    assert.equal(nextConfig.poweredByHeader, false);
  });

  it("applies the required headers to every page", async () => {
    const headers = await allPageHeaders();
    for (const name of [
      "content-security-policy",
      "strict-transport-security",
      "x-content-type-options",
      "referrer-policy",
      "permissions-policy",
    ]) {
      assert.ok(headers.has(name), `${name} must be configured`);
    }
  });

  it("keeps dangerous CSP capabilities disabled in production", async () => {
    const previousEnvironment = process.env.NODE_ENV;
    process.env.NODE_ENV = "production";
    try {
      const headers = await allPageHeaders();
      const csp = headers.get("content-security-policy");
      assert.match(csp, /object-src 'none'/);
      assert.match(csp, /frame-ancestors 'none'/);
      assert.doesNotMatch(csp, /'unsafe-eval'/);
    } finally {
      process.env.NODE_ENV = previousEnvironment;
    }
  });
});
