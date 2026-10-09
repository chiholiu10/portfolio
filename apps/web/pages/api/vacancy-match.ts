import type { NextApiRequest, NextApiResponse } from "next";
import {
  matchResponseSchema,
  vacancyRequestSchema,
} from "@portfolio/matcher-contracts";
import { loadPortfolioSection } from "@/lib/contentful/portfolio";
import { hashValue, maskSensitiveContent } from "@/lib/career-agent/privacy";
import { consumeDistributedRateLimit } from "@/lib/career-agent/rate-limit";

export const config = { api: { bodyParser: { sizeLimit: "16kb" } } };
const localRequests = new Map<string, number>();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Use POST." });
  }
  try {
    if (
      req.headers.origin &&
      new URL(req.headers.origin).host !== req.headers.host
    ) {
      return res.status(403).json({ error: "This request is not allowed." });
    }
  } catch {
    return res.status(403).json({ error: "This request is not allowed." });
  }
  const parsed = vacancyRequestSchema.safeParse(req.body);
  if (!parsed.success)
    return res
      .status(400)
      .json({ error: "Paste a vacancy containing 40 to 8,000 characters." });
  const serviceUrl = process.env.MATCHER_API_URL;
  const token = process.env.MATCHER_API_TOKEN;
  if (!serviceUrl || !token)
    return res
      .status(503)
      .json({ error: "The vacancy matcher has not been configured yet." });
  try {
    if (process.env.NODE_ENV === "production") {
      const address =
        req.headers["x-vercel-forwarded-for"] ||
        req.socket.remoteAddress ||
        "unknown";
      const secret = process.env.CAREER_AGENT_HASH_SECRET;
      if (!secret) throw new Error("Rate limiting is not configured");
      const addressHash = await hashValue(String(address), secret);
      const limit = await consumeDistributedRateLimit(
        `vacancy:${addressHash}`,
        5,
        60_000,
      );
      if (!limit.allowed) {
        res.setHeader("Retry-After", limit.retryAfterSeconds);
        return res.status(429).json({
          error: "Please wait and try again in one minute.",
        });
      }
    } else {
      const now = Date.now();
      for (const [key, time] of localRequests)
        if (now - time > 60_000) localRequests.delete(key);
      const key = req.socket.remoteAddress || "local";
      if (now - (localRequests.get(key) || 0) < 2000)
        return res
          .status(429)
          .json({ error: "Please wait before running another analysis." });
      localRequests.set(key, now);
    }
    const section = await loadPortfolioSection();
    const projects = section.arrays.projects
      .filter((project) => !project.archived && project.caseStudy)
      .map((project) => {
        const study = project.caseStudy!;
        return {
          id: project.id,
          title: project.title,
          summary: [
            study.summary || study.overview || study.contribution || "",
            ...(study.additionalProjects || []).map(
              (additional) => `${additional.title}: ${additional.overview}`,
            ),
          ]
            .filter(Boolean)
            .join(" "),
          evidence: JSON.stringify({ title: project.title, caseStudy: study }),
        };
      });
    const response = await fetch(new URL("/match", serviceUrl), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        vacancy: maskSensitiveContent(parsed.data.vacancy),
        projects,
      }),
      signal: AbortSignal.timeout(30_000),
    });
    if (!response.ok) throw new Error("Matcher unavailable");
    const result = matchResponseSchema.parse(await response.json());
    const allowed = new Map(projects.map((project) => [project.id, project]));
    result.matches = result.matches
      .filter((match) => allowed.has(match.id))
      .map((match) => ({
        ...match,
        title: allowed.get(match.id)!.title,
        evidence: allowed.get(match.id)!.summary,
      }));
    return res.status(200).json(result);
  } catch {
    return res.status(503).json({
      error: "The vacancy could not be analysed. Please try again later.",
    });
  }
}
