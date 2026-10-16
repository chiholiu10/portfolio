import { z } from "zod";

export const vacancyRequestSchema = z.object({
  vacancy: z.string().trim().min(40).max(8000),
});
export const requirementDetailSchema = z.object({
  name: z.string().min(1).max(200),
  category: z.enum([
    "technology",
    "quality",
    "product",
    "collaboration",
    "platform",
    "seniority",
    "experience",
    "language",
    "work-arrangement",
  ]),
  priority: z.enum(["must-have", "nice-to-have"]),
  detail: z.string().max(200).optional(),
});
export const matcherServiceResponseSchema = z.object({
  mode: z.enum(["ai", "keywords"]),
  requirements: z.array(z.string()).max(30),
  requirementDetails: z.array(requirementDetailSchema).max(30),
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
  status: z.enum(["verified", "missing", "not-assessed", "profile-match"]),
  confidence: z.number().int().min(0).max(100),
  evidence: z.array(requirementEvidenceSchema).max(3),
  profileEvidence: z.string().max(500).optional(),
});

export const matchResponseSchema = matcherServiceResponseSchema.extend({
  requirementAnalysis: z.array(requirementAnalysisSchema).max(30),
});

export type MatcherServiceResponse = z.infer<
  typeof matcherServiceResponseSchema
>;
export type VacancyMatch = z.infer<typeof matchResponseSchema>;
