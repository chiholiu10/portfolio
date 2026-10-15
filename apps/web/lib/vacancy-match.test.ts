import { describe, expect, it } from "@jest/globals";
import {
  matchResponseSchema,
  vacancyRequestSchema,
} from "@portfolio/matcher-contracts";

describe("vacancy matcher boundaries", () => {
  it("rejects empty and oversized vacancy text", () => {
    expect(vacancyRequestSchema.safeParse({ vacancy: "   " }).success).toBe(
      false,
    );
    expect(
      vacancyRequestSchema.safeParse({ vacancy: "a".repeat(8001) }).success,
    ).toBe(false);
  });

  it("rejects arbitrary links masquerading as project IDs", () => {
    expect(
      matchResponseSchema.safeParse({
        mode: "ai",
        requirements: [],
        missing: [],
        requirementAnalysis: [],
        matches: [
          {
            id: "https://example.com",
            title: "Unknown",
            evidence: "Unknown",
            skills: [],
          },
        ],
      }).success,
    ).toBe(false);
  });

  it("rejects untrusted project links inside explanations", () => {
    expect(
      matchResponseSchema.safeParse({
        mode: "ai",
        requirements: ["React"],
        missing: [],
        matches: [],
        requirementAnalysis: [
          {
            requirement: "React",
            status: "verified",
            confidence: 95,
            evidence: [
              {
                projectId: "https://example.com",
                projectTitle: "Unknown",
                excerpt: "Unknown",
                relevance: "Unknown",
              },
            ],
          },
        ],
      }).success,
    ).toBe(false);
  });
});
