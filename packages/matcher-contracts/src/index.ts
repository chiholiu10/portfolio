import { z } from "zod";

export const vacancyRequestSchema = z.object({
  vacancy: z.string().trim().min(40).max(8000),
});
export const matchResponseSchema = z.object({
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
export type VacancyMatch = z.infer<typeof matchResponseSchema>;
