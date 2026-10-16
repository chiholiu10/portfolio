import { describe, expect, it } from "@jest/globals";
import { buildRequirementAnalysis } from "@/lib/vacancy-match-explanation";

describe("vacancy match explanations", () => {
  it("connects each requirement to verified project evidence", () => {
    const analysis = buildRequirementAnalysis(
      {
        mode: "keywords",
        requirements: ["React", "Accessibility", "Testing", "Python"],
        requirementDetails: [
          { name: "React", category: "technology", priority: "must-have" },
          {
            name: "Accessibility",
            category: "quality",
            priority: "must-have",
          },
          { name: "Testing", category: "quality", priority: "must-have" },
          {
            name: "Python",
            category: "technology",
            priority: "must-have",
          },
        ],
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
            claims: [
              {
                skill: "React",
                statement: "Built an interface with React.",
                context: "React case",
                ownership: "individual",
                source: "contribution",
              },
              {
                skill: "Accessibility",
                statement: "Improved WCAG accessibility for users.",
                context: "React case",
                ownership: "individual",
                source: "impact",
              },
              {
                skill: "Testing",
                statement: "Added Jest tests to protect critical behaviour.",
                context: "React case",
                ownership: "individual",
                source: "contribution",
              },
            ],
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
      "Added Jest tests to protect critical behaviour.",
    );
    expect(analysis[3]).toEqual({
      requirement: "Python",
      status: "missing",
      confidence: 0,
      evidence: [],
    });
  });

  it("keeps profile constraints separate from case-study evidence", () => {
    const [analysis] = buildRequirementAnalysis({
      mode: "keywords",
      requirements: ["Experience: 4+ years"],
      requirementDetails: [
        {
          name: "Experience: 4+ years",
          category: "experience",
          priority: "must-have",
          detail: "4+ years",
        },
      ],
      missing: ["Experience: 4+ years"],
      matches: [],
    });

    expect(analysis).toEqual({
      requirement: "Experience: 4+ years",
      status: "not-assessed",
      confidence: 0,
      evidence: [],
    });
  });

  it("verifies Dutch and English profile constraints against confirmed facts", () => {
    const analysis = buildRequirementAnalysis(
      {
        mode: "keywords",
        requirements: [
          "Experience: 4+ years",
          "Language: English",
          "Language: Nederlands",
          "Work arrangement: hybrid / remote",
        ],
        requirementDetails: [
          {
            name: "Experience: 4+ years",
            category: "experience",
            priority: "must-have",
            detail: "4+ years",
          },
          {
            name: "Language: English",
            category: "language",
            priority: "must-have",
            detail: "English",
          },
          {
            name: "Language: Nederlands",
            category: "language",
            priority: "must-have",
            detail: "Nederlands",
          },
          {
            name: "Work arrangement: hybrid / remote",
            category: "work-arrangement",
            priority: "must-have",
            detail: "hybrid / remote",
          },
        ],
        missing: [],
        matches: [],
      },
      new Map(),
      {
        seniority: "Senior",
        experienceYears: 8,
        languages: [
          { name: "Dutch", level: "Native" },
          { name: "English", level: "Fluent" },
          { name: "Cantonese", level: "Basic" },
        ],
        workArrangements: ["hybrid", "remote"],
      },
    );

    expect(analysis.map((item) => item.status)).toEqual([
      "profile-match",
      "profile-match",
      "profile-match",
      "profile-match",
    ]);
    expect(analysis.map((item) => item.profileEvidence)).toEqual([
      "8+ years of professional experience.",
      "English: Fluent.",
      "Dutch: Native.",
      "Available for hybrid and remote work.",
    ]);
  });

  it("verifies seniority against the confirmed candidate profile", () => {
    const [analysis] = buildRequirementAnalysis(
      {
        mode: "keywords",
        requirements: ["Seniority: Senior"],
        requirementDetails: [
          {
            name: "Seniority: Senior",
            category: "seniority",
            priority: "must-have",
            detail: "Senior",
          },
        ],
        missing: [],
        matches: [],
      },
      new Map(),
      {
        seniority: "Senior",
        experienceYears: 8,
        languages: [],
        workArrangements: ["hybrid", "remote"],
      },
    );

    expect(analysis).toMatchObject({
      requirement: "Seniority: Senior",
      status: "profile-match",
      profileEvidence:
        "Senior frontend profile with 8+ years of professional experience.",
    });
  });

  it("labels related technology evidence as transferable rather than direct", () => {
    const [analysis] = buildRequirementAnalysis(
      {
        mode: "keywords",
        requirements: ["Sanity"],
        requirementDetails: [
          {
            name: "Sanity",
            category: "platform",
            priority: "nice-to-have",
          },
        ],
        missing: [],
        matches: [
          {
            id: "portfolio",
            title: "Portfolio",
            evidence: "Headless CMS integration.",
            skills: ["Sanity"],
            transferableSkills: [
              { requirement: "Sanity", evidenceSkill: "Headless CMS" },
            ],
          },
        ],
      },
      new Map([
        [
          "portfolio",
          {
            title: "Portfolio",
            summary: "Headless CMS integration.",
            claims: [
              {
                skill: "Headless CMS",
                statement:
                  "Integrated Contentful as a headless CMS through GraphQL.",
                context: "Portfolio platform",
                ownership: "individual",
                source: "contribution",
              },
            ],
          },
        ],
      ]),
    );

    expect(analysis).toMatchObject({
      requirement: "Sanity",
      status: "transferable",
      confidence: 65,
      evidence: [
        {
          level: "transferable",
          excerpt: "Integrated Contentful as a headless CMS through GraphQL.",
        },
      ],
    });
  });
});
