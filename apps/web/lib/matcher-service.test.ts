import { afterEach, expect, it, jest } from "@jest/globals";
import { requestMatcher } from "./matcher-service";

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
