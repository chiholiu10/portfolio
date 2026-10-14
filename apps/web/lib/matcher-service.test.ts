import { afterEach, expect, it, jest } from "@jest/globals";
import { requestMatcher, matcherEndpoint } from "./matcher-service";

const originalFetch = global.fetch;
afterEach(() => {
  global.fetch = originalFetch;
});
it("retries a refused connection once and forwards the request ID", async () => {
  const mocked = jest.fn<typeof fetch>();
  global.fetch = mocked;
  mocked.mockRejectedValueOnce(
    new TypeError("fetch failed", { cause: { code: "ECONNREFUSED" } }),
  );
  mocked.mockResolvedValueOnce(Response.json({ ok: true }));
  expect(
    (
      await requestMatcher(
        new URL("http://matcher/match"),
        "test-token",
        "{}",
        "test-id",
      )
    ).status,
  ).toBe(200);
  expect(mocked).toHaveBeenCalledTimes(2);
  expect(mocked.mock.calls[1][1]?.headers).toMatchObject({
    "X-Request-ID": "test-id",
  });
});
it("does not retry a timeout or busy response and duplicate analysis work", async () => {
  const mocked = jest.fn<typeof fetch>();
  global.fetch = mocked;
  mocked.mockRejectedValueOnce(new DOMException("Timed out", "TimeoutError"));
  await expect(
    requestMatcher(new URL("http://matcher/match"), "test-token", "{}"),
  ).rejects.toThrow("Timed out");
  expect(mocked).toHaveBeenCalledTimes(1);
  mocked.mockResolvedValueOnce(
    Response.json({ code: "MATCHER_BUSY" }, { status: 503 }),
  );
  expect(
    (await requestMatcher(new URL("http://matcher/match"), "test-token", "{}"))
      .status,
  ).toBe(503);
  expect(mocked).toHaveBeenCalledTimes(2);
});

it("allows local development and Docker endpoints", () => {
  expect(matcherEndpoint("http://127.0.0.1:8000", false).href).toBe(
    "http://127.0.0.1:8000/match",
  );
  expect(matcherEndpoint("http://matcher-api:8000", false).hostname).toBe(
    "matcher-api",
  );
});
it("requires a remote HTTPS endpoint in production", () => {
  expect(matcherEndpoint("https://api.chiholiu.com", true).href).toBe(
    "https://api.chiholiu.com/match",
  );
  for (const value of [
    "http://api.chiholiu.com",
    "https://localhost",
    "https://127.0.0.1",
    "https://127.1",
    "https://[::1]",
    "https://matcher-api",
    "https://localhost.",
    "https://user:password@api.chiholiu.com",
    "file:///match",
  ]) {
    expect(() => matcherEndpoint(value, true)).toThrow();
  }
});
