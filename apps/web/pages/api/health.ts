import type { NextApiRequest, NextApiResponse } from "next";
import { HTTP_STATUS } from "@/lib/http/status";

type HealthResponse = {
  ok: true;
  service: "portfolio-web";
};

export default function handler(
  _request: NextApiRequest,
  response: NextApiResponse<HealthResponse>,
) {
  response.setHeader("Cache-Control", "no-store");
  response.status(HTTP_STATUS.OK).json({ ok: true, service: "portfolio-web" });
}
