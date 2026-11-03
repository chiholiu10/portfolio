import { describe, expect, it, jest } from "@jest/globals";
import type { NextApiRequest, NextApiResponse } from "next";
import careerAgentHandler, {
  config as careerAgentConfig,
} from "../pages/api/career-agent";
import contactHandler, { config as contactConfig } from "../pages/api/contact";
import vacancyMatchHandler, {
  config as vacancyMatchConfig,
} from "../pages/api/vacancy-match";

type ApiHandler = (
  request: NextApiRequest,
  response: NextApiResponse,
) => Promise<void>;

const handlers: Array<[string, ApiHandler]> = [
  ["contact", contactHandler as ApiHandler],
  ["career agent", careerAgentHandler as ApiHandler],
  ["vacancy matcher", vacancyMatchHandler as ApiHandler],
];

const request = ({
  method = "POST",
  origin = "https://attacker.invalid",
  body = {},
} = {}) =>
  ({
    method,
    headers: {
      host: "www.chiholiu.com",
      origin,
      "content-type": "application/json",
    },
    socket: { remoteAddress: "127.0.0.1" },
    body,
  }) as unknown as NextApiRequest;

const response = () => {
  const result = {
    setHeader: jest.fn(),
    status: jest.fn(),
    json: jest.fn(),
  };
  result.status.mockReturnValue(result);
  return result;
};

describe.each(handlers)("%s API security boundary", (_name, handler) => {
  it("rejects an untrusted origin", async () => {
    const res = response();
    await handler(request(), res as unknown as NextApiResponse);
    expect(res.status).toHaveBeenCalledWith(403);
  });

  it("rejects an unsupported HTTP method", async () => {
    const res = response();
    await handler(
      request({ method: "GET", origin: "https://www.chiholiu.com" }),
      res as unknown as NextApiResponse,
    );
    expect(res.status).toHaveBeenCalledWith(405);
  });

  it("rejects invalid same-origin input before external work", async () => {
    const fetchSpy = jest.spyOn(global, "fetch");
    const res = response();
    await handler(
      request({ origin: "https://www.chiholiu.com" }),
      res as unknown as NextApiResponse,
    );
    expect(res.status).toHaveBeenCalledWith(400);
    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });
});

describe("API request size limits", () => {
  it("keeps explicit limits on every public write endpoint", () => {
    expect(contactConfig.api.bodyParser.sizeLimit).toBe("8kb");
    expect(careerAgentConfig.api.bodyParser.sizeLimit).toBe("4kb");
    expect(vacancyMatchConfig.api.bodyParser.sizeLimit).toBe("16kb");
  });
});
