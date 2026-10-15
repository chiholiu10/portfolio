import { describe, expect, it } from "@jest/globals";
import { buildRequirementAnalysis } from "@/lib/vacancy-match-explanation";

describe("vacancy match explanations", () => {
  it("connects each requirement to verified project evidence", () => {
    const analysis = buildRequirementAnalysis(
      {
        mode: "keywords",
        requirements: ["React", "Accessibility", "Testing", "Python"],
        missing: ["Python"],
        matches: [
          {
            id: "react-case",
            title: "React case",
            evidence: "Built an accessible React interface.",
            skills: ["React", "Accessibility", "Testing"],
          },
          {
            id: "second-case",
            title: "Second case",
            evidence: "Shipped another React application.",
            skills: ["React"],
          },
        ],
      },
      new Map([
        [
          "react-case",
          {
            title: "React case",
            summary: "Trusted summary",
            evidence: JSON.stringify({
              technology: "Built an interface with React.",
              accessibility: "Improved WCAG accessibility for users.",
              testing: "Jest",
            }),
          },
        ],
      ]),
    );

    expect(analysis[0]).toMatchObject({
      requirement: "React",
      status: "verified",
      confidence: 95,
    });
    expect(analysis[0].evidence.map((item) => item.projectId)).toEqual([
      "react-case",
      "second-case",
    ]);
    expect(analysis[0].evidence[0].excerpt).toBe(
      "Built an interface with React.",
    );
    expect(analysis[1].evidence[0].excerpt).toBe(
      "Improved WCAG accessibility for users.",
    );
    expect(analysis[2].evidence[0].excerpt).toBe(
      "Verified case-study evidence: Jest.",
    );
    expect(analysis[3]).toEqual({
      requirement: "Python",
      status: "missing",
      confidence: 0,
      evidence: [],
    });
  });
});
