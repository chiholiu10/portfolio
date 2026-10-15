import type { NextApiRequest, NextApiResponse } from "next";

type HealthResponse = {
  ok: true;
  service: "portfolio-web";
};

export default function handler(
  _request: NextApiRequest,
  response: NextApiResponse<HealthResponse>,
) {
  response.setHeader("Cache-Control", "no-store");
  response.status(200).json({ ok: true, service: "portfolio-web" });
}
