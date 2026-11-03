import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  parseDeploymentTarget,
  runDeploymentSecurityChecks,
} from "./check-deployment-security.mjs";

const target = "https://portfolio.example";
const silentLogger = { log() {}, error() {} };

const secureHeaders = {
  "content-security-policy":
    "default-src 'self'; object-src 'none'; frame-ancestors 'none'",
  "strict-transport-security": "max-age=31536000; includeSubDomains",
  "x-content-type-options": "nosniff",
  "referrer-policy": "strict-origin-when-cross-origin",
  "permissions-policy": "camera=(), microphone=()",
};

const response = (status, headers = {}) =>
  new Response(null, { status, headers });

const createFetch =
  ({
    homepageHeaders = secureHeaders,
    secretStatus = 404,
    apiStatus = 403,
    apiHeaders = {},
    redirectStatus = 308,
  } = {}) =>
  async (input) => {
    const url = new URL(input);
    if (url.protocol === "http:") {
      return response(redirectStatus, { location: target });
    }
    if (url.pathname === "/") return response(200, homepageHeaders);
    if (url.pathname === "/.env" || url.pathname === "/.git/config") {
      return response(secretStatus);
    }
    if (url.pathname.startsWith("/api/")) {
      return response(apiStatus, apiHeaders);
    }
    return response(404);
  };

const run = (overrides) =>
  runDeploymentSecurityChecks({
    rawTarget: target,
    fetchImplementation: createFetch(overrides),
    logger: silentLogger,
  });

describe("deployment security checks", () => {
  it("passes every check for a secure deployment", async () => {
    const result = await run();
    assert.equal(result.failures.length, 0);
    assert.deepEqual(
      result.results.map(({ status }) => status),
      ["pass", "pass", "pass", "pass"],
    );
  });

  it("fails when HTTP does not redirect permanently", async () => {
    const result = await run({ redirectStatus: 200 });
    assert.equal(result.results[0].status, "fail");
  });

  it("fails when a required security header is missing", async () => {
    const incompleteHeaders = { ...secureHeaders };
    delete incompleteHeaders["content-security-policy"];
    const result = await run({ homepageHeaders: incompleteHeaders });
    assert.equal(result.results[1].status, "fail");
  });

  it("fails when HSTS is shorter than 180 days", async () => {
    const result = await run({
      homepageHeaders: {
        ...secureHeaders,
        "strict-transport-security": "max-age=60",
      },
    });
    assert.equal(result.results[1].status, "fail");
  });

  it("fails when a secret file is publicly accessible", async () => {
    const result = await run({ secretStatus: 200 });
    assert.equal(result.results[2].status, "fail");
  });

  it("fails when an untrusted API origin is accepted", async () => {
    const result = await run({ apiStatus: 200 });
    assert.equal(result.results[3].status, "fail");
  });

  it("fails when an API sends wildcard CORS despite returning 403", async () => {
    const result = await run({
      apiHeaders: { "access-control-allow-origin": "*" },
    });
    assert.equal(result.results[3].status, "fail");
  });
});

describe("deployment target validation", () => {
  it("accepts an HTTPS deployment", () => {
    assert.equal(parseDeploymentTarget(target).href, `${target}/`);
  });

  it("rejects a non-HTTPS deployment", () => {
    assert.throws(
      () => parseDeploymentTarget("http://portfolio.example"),
      /must use HTTPS/,
    );
  });
});
