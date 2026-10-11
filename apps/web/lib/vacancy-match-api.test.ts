/* global jest */
import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";
import type { NextApiRequest, NextApiResponse } from "next";
import handler from "../pages/api/vacancy-match";
import { loadPortfolioSection } from "@/lib/contentful/portfolio";

jest.mock("@/lib/contentful/portfolio", () => ({
  loadPortfolioSection: jest.fn(),
}));

const originalFetch = global.fetch;
const originalUrl = process.env.MATCHER_API_URL;
const originalToken = process.env.MATCHER_API_TOKEN;
let requestNumber = 0;

async function request(address = `test-${++requestNumber}`) {
  const req = {
    method: "POST",
    headers: { host: "localhost:3100", origin: "http://localhost:3100" },
    socket: { remoteAddress: address },
    body: {
      vacancy:
        "Looking for a frontend developer experienced in React and TypeScript.",
    },
  } as unknown as NextApiRequest;
  const res = {
    setHeader: jest.fn(),
    status: jest.fn(),
    json: jest.fn(),
  };
  res.status.mockReturnValue(res);
  await handler(req, res as unknown as NextApiResponse);
  return res;
}

beforeEach(() => {
  process.env.MATCHER_API_URL = "http://127.0.0.1:8000";
  process.env.MATCHER_API_TOKEN = "test-only-token";
  jest.spyOn(console, "error").mockImplementation(() => {});
  jest.mocked(loadPortfolioSection).mockResolvedValue({
    arrays: { projects: [] },
  } as unknown as Awaited<ReturnType<typeof loadPortfolioSection>>);
});

afterEach(() => {
  global.fetch = originalFetch;
  if (originalUrl === undefined) delete process.env.MATCHER_API_URL;
  else process.env.MATCHER_API_URL = originalUrl;
  if (originalToken === undefined) delete process.env.MATCHER_API_TOKEN;
  else process.env.MATCHER_API_TOKEN = originalToken;
  jest.restoreAllMocks();
  jest.clearAllMocks();
});

describe("vacancy matcher service failures", () => {
  it("returns a safe 503 when Python is unreachable and recovers on the next request", async () => {
    const fetchMock = jest.fn<
      ReturnType<typeof fetch>,
      Parameters<typeof fetch>
    >();
    global.fetch = fetchMock;
    fetchMock.mockRejectedValue(
      new TypeError("fetch failed", { cause: { code: "ECONNREFUSED" } }),
    );
    const clock = jest.spyOn(Date, "now").mockReturnValue(100000);
    const failed = await request("recovery-client");
    expect(failed.status).toHaveBeenCalledWith(503);
    expect(failed.json).toHaveBeenCalledWith({
      error: "The vacancy could not be analysed. Please try again later.",
    });
    fetchMock.mockResolvedValueOnce(
      Response.json({
        mode: "keywords",
        requirements: [],
        missing: [],
        matches: [],
      }),
    );
    clock.mockReturnValue(103000);
    const recovered = await request("recovery-client");
    expect(recovered.status).toHaveBeenCalledWith(200);
    expect(recovered.json).toHaveBeenCalledWith({
      mode: "keywords",
      requirements: [],
      missing: [],
      matches: [],
    });
  });

  it("returns a safe 503 when the upstream request times out", async () => {
    global.fetch = jest
      .fn<ReturnType<typeof fetch>, Parameters<typeof fetch>>()
      .mockRejectedValue(new DOMException("Timed out", "TimeoutError"));
    const res = await request();
    expect(res.status).toHaveBeenCalledWith(503);
    expect(res.json).toHaveBeenCalledWith({
      error: "The vacancy could not be analysed. Please try again later.",
    });
  });

  it("distinguishes capacity exhaustion from an unavailable service", async () => {
    global.fetch = jest
      .fn<ReturnType<typeof fetch>, Parameters<typeof fetch>>()
      .mockResolvedValue(
        Response.json({ code: "MATCHER_BUSY" }, { status: 503 }),
      );
    const res = await request();
    expect(res.status).toHaveBeenCalledWith(503);
    expect(res.json).toHaveBeenCalledWith({ code: "MATCHER_BUSY" });
    expect(res.setHeader).toHaveBeenCalledWith("Retry-After", "5");
  });
});
