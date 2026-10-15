import { z } from "zod";

export const vacancyRequestSchema = z.object({
  vacancy: z.string().trim().min(40).max(8000),
});
export const matcherServiceResponseSchema = z.object({
  mode: z.enum(["ai", "keywords"]),
  requirements: z.array(z.string()).max(30),
  missing: z.array(z.string()).max(30),
  matches: z
    .array(
      z.object({
        id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
        title: z.string(),
        evidence: z.string(),
        skills: z.array(z.string()),
      }),
    )
    .max(3),
});

export const requirementEvidenceSchema = z.object({
  projectId: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  projectTitle: z.string(),
  excerpt: z.string(),
  relevance: z.string(),
});

export const requirementAnalysisSchema = z.object({
  requirement: z.string(),
  status: z.enum(["verified", "missing"]),
  confidence: z.number().int().min(0).max(100),
  evidence: z.array(requirementEvidenceSchema).max(3),
});

export const matchResponseSchema = matcherServiceResponseSchema.extend({
  requirementAnalysis: z.array(requirementAnalysisSchema).max(30),
});

export type MatcherServiceResponse = z.infer<
  typeof matcherServiceResponseSchema
>;
export type VacancyMatch = z.infer<typeof matchResponseSchema>;
