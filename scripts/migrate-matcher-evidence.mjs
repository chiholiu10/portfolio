import process from "node:process";
import { readFileSync } from "node:fs";

const taxonomy = JSON.parse(
  readFileSync(new URL("../apps/matcher-api/taxonomy.json", import.meta.url)),
);

process.loadEnvFile("apps/web/.env");
try {
  process.loadEnvFile("apps/web/.env.local");
} catch {
  // The repository works with either .env or .env.local.
}

const entryId = "2qFy05XNAe3Ho1CmJiAgbO";
const apply = process.argv.includes("--apply");
const required = [
  "CONTENTFUL_MANAGEMENT_TOKEN",
  "CONTENTFUL_SPACE_ID",
  "CONTENTFUL_ENVIRONMENT",
];

for (const variable of required) {
  if (!process.env[variable]) throw new Error(`Missing ${variable}`);
}

const skills = new Map(
  taxonomy.skills.map(({ name, evidencePatterns }) => [
    name,
    evidencePatterns.map((pattern) => new RegExp(pattern, "i")),
  ]),
);
const aiToolPatterns = taxonomy.aiEvidence.toolPatterns.map(
  (pattern) => new RegExp(pattern, "i"),
);
const aiAppliedPatterns = taxonomy.aiEvidence.appliedPatterns.map(
  (pattern) => new RegExp(pattern, "i"),
);
const aiEngineeringContext = new RegExp(
  taxonomy.aiEvidence.contextPattern,
  "i",
);

const matchesAny = (patterns, value) =>
  patterns.some((pattern) => pattern.test(value));

const hasAppliedAiEvidence = (value) =>
  matchesAny(aiAppliedPatterns, value) ||
  (matchesAny(aiToolPatterns, value) && aiEngineeringContext.test(value));

const slug = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const sentences = (value) =>
  String(value || "")
    .split(/(?<=[.!?])\s+|\n+/)
    .map((item) => item.trim())
    .filter((item) => item.length >= 20);

function claimSources(scope) {
  return [
    ...sentences(scope.contribution).map((statement) => ({
      statement,
      source: "contribution",
    })),
    ...sentences(scope.overview).map((statement) => ({
      statement,
      source: "contribution",
    })),
    ...(scope.impact || []).flatMap((item) =>
      sentences(item.description).map((statement) => ({
        statement,
        source: "impact",
      })),
    ),
    ...sentences(scope.result).map((statement) => ({
      statement,
      source: "result",
    })),
  ];
}

function ownership(statement, source) {
  if (source === "contribution" || /\b(?:I|my)\b/.test(statement))
    return "individual";
  if (/\b(?:we|team|collaborat)\w*\b/i.test(statement)) return "shared";
  return "team";
}

function claimsForScope(projectId, context, scope) {
  const sources = claimSources(scope);
  return [...skills.entries()].flatMap(([skill, patterns]) => {
    const evidence = sources.find(
      ({ statement }) =>
        matchesAny(patterns, statement) &&
        (skill !== "AI" || hasAppliedAiEvidence(statement)),
    );
    const technology = (scope.technologies || []).find(
      (item) =>
        matchesAny(patterns, item) &&
        (skill !== "AI" || hasAppliedAiEvidence(item)),
    );
    if (!evidence && !technology) return [];
    const source = evidence?.source || "technology";
    const statement =
      evidence?.statement ||
      `The published case study lists ${technology} as technology applied within ${context}.`;
    return [
      {
        id: `${slug(projectId)}-${slug(context)}-${slug(skill)}`,
        skill,
        statement,
        context,
        ownership: ownership(statement, source),
        source,
      },
    ];
  });
}

function verifiedClaims(project) {
  const study = project.caseStudy;
  if (!study) return [];
  const claims = claimsForScope(project.id, project.title, study);
  for (const additional of study.additionalProjects || []) {
    claims.push(
      ...claimsForScope(project.id, additional.title, {
        ...additional,
        result: additional.impact?.map((item) => item.description).join(" "),
      }),
    );
  }
  return claims.filter(
    (claim, index) =>
      claims.findIndex((candidate) => candidate.id === claim.id) === index,
  );
}

const baseUrl = `https://api.contentful.com/spaces/${encodeURIComponent(process.env.CONTENTFUL_SPACE_ID)}/environments/${encodeURIComponent(process.env.CONTENTFUL_ENVIRONMENT)}/entries/${entryId}`;
const headers = {
  Authorization: `Bearer ${process.env.CONTENTFUL_MANAGEMENT_TOKEN}`,
  "Content-Type": "application/vnd.contentful.management.v1+json",
};
const response = await fetch(baseUrl, { headers });
if (!response.ok)
  throw new Error(`Contentful read failed with HTTP ${response.status}`);
const entry = await response.json();
const [locale] = Object.keys(entry.fields.arrays || {});
if (!locale) throw new Error("Portfolio arrays field has no locale");

const content = entry.fields.arrays[locale];
const screenshotUrl = process.env.PORTFOLIO_SCREENSHOT_URL;
const screenshotAssetId = process.env.PORTFOLIO_SCREENSHOT_ASSET_ID;

if (screenshotUrl) {
  const portfolioProject = {
    id: "chiho-portfolio",
    title: "Chiho Portfolio",
    imageMatch: "chiho-portfolio",
    keywords: [
      "portfolio",
      "next.js",
      "node.js",
      "graphql",
      "contentful",
      "docker",
      "ci/cd",
      "github actions",
    ],
    suggestedQuestions: [
      "How is this portfolio engineered?",
      "How does the CI/CD pipeline work?",
      "How are Docker and Node.js used?",
      "How is Contentful integrated with GraphQL?",
    ],
    caseStudy: {
      liveUrl: "/",
      liveLabel: "View live portfolio",
      workScope: "Independent portfolio product",
      role: "Senior Frontend Developer, Product-minded, AI-enabled",
      period: "2026",
      summary:
        "A production portfolio that combines polished frontend delivery with structured content, explainable vacancy matching and operational engineering.",
      overview:
        "I designed and built this portfolio as a maintained product rather than a static showcase. It connects recruiter-facing case studies to structured evidence and makes the delivery setup visible and testable.",
      problem:
        "A senior portfolio needs to prove more than visual quality. It should make technical decisions, delivery maturity and verified project evidence easy to inspect without overwhelming a recruiter.",
      contribution:
        "I built the responsive Next.js and TypeScript experience with React, Styled Components, Motion and accessibility-conscious interaction design. I implemented Node.js API routes and a private Python FastAPI matcher, integrated Contentful through GraphQL and use Supabase for protected data flows. I applied Gemini and Groq models, embeddings, semantic search and validated structured output to build explainable AI features. I created Docker Compose development and production environments with health checks and hardened containers. I also built the GitHub Actions CI/CD workflow with formatting, linting, type checking, Jest tests, Python matcher tests, evaluation and Docker integration checks before a gated Vercel deployment.",
      technologies: [
        "Next.js",
        "React",
        "TypeScript",
        "Styled Components",
        "Motion",
        "Node.js",
        "Python FastAPI",
        "Contentful GraphQL",
        "Supabase",
        "Gemini",
        "Groq",
        "Embeddings and semantic search",
        "Zod and Pydantic",
        "Docker",
        "GitHub Actions CI/CD",
        "Vercel",
      ],
      impact: [
        {
          title: "Frontend experience",
          description:
            "Next.js, React, TypeScript, Styled Components and Motion deliver a responsive and accessible recruiter experience.",
        },
        {
          title: "Backend and integrations",
          description:
            "Node.js API routes, Python FastAPI, Contentful GraphQL and Supabase connect content, matching and protected data flows.",
        },
        {
          title: "AI engineering",
          description:
            "Gemini, Groq, embeddings, semantic search and validated structured output power explainable matching and the career assistant.",
        },
        {
          title: "Quality and delivery",
          description:
            "Jest, Python tests, Docker health checks and GitHub Actions CI/CD quality gates protect the application before Vercel deployment.",
        },
      ],
      securityControls: [
        {
          title: "Origin validation",
          description:
            "Confirms that public API requests come from an allowed website, making cross-site abuse harder.",
        },
        {
          title: "Schema validation",
          description:
            "Checks input structure, type and length before processing, rejecting malformed or unexpected data.",
        },
        {
          title: "Rate limiting",
          description:
            "Limits requests per visitor and time window to reduce spam, AI cost abuse and service overload.",
        },
        {
          title: "Sensitive-data masking",
          description:
            "Redacts email addresses and phone numbers before conversation content is stored, while secret-like input is rejected.",
        },
        {
          title: "Server-side credentials",
          description:
            "Keeps model and Supabase service credentials out of browser code so visitors cannot read or reuse them.",
        },
        {
          title: "Security headers",
          description:
            "CSP, HSTS, frame protection and MIME-type protection reduce common browser attack paths.",
        },
        {
          title: "Hardened containers",
          description:
            "Runs the matching service as a non-root user in a minimal container, limiting the potential impact of a compromise.",
        },
      ],
      result:
        "The result is a responsive production portfolio with independently managed content, explainable matching and a repeatable delivery pipeline.",
      evidence: [
        {
          imageUrl: screenshotUrl,
          ...(screenshotAssetId ? { assetId: screenshotAssetId } : {}),
          alt: "Homepage of Chiho Liu's portfolio",
          caption:
            "The live portfolio homepage, captured as evidence of the current production experience.",
          width: 1440,
          height: 810,
        },
      ],
    },
  };
  const projectIndex = content.projects.findIndex(
    (project) => project.id === portfolioProject.id,
  );
  if (projectIndex >= 0) content.projects[projectIndex] = portfolioProject;
  else content.projects.push(portfolioProject);

  const portfolioImages = entry.fields.array?.[locale];
  if (!Array.isArray(portfolioImages)) {
    throw new Error("Portfolio image array is missing");
  }
  if (!portfolioImages.some((image) => image.secure_url === screenshotUrl)) {
    portfolioImages.push({ secure_url: screenshotUrl });
  }
}

const vacancyMatcher = content.projects.find(
  (project) => project.id === "ai-vacancy-matcher",
);
if (!vacancyMatcher?.caseStudy) {
  throw new Error("AI Vacancy Matcher case study is missing");
}
vacancyMatcher.caseStudy.contribution = vacancyMatcher.caseStudy.contribution
  .replace(
    "responsive interface in Next.js and TypeScript",
    "responsive interface in React, Next.js and TypeScript",
  )
  .replace(
    "I created the end-to-end product flow",
    "I designed the solution architecture and created the end-to-end product flow",
  )
  .replace(
    "loads current case studies from Contentful",
    "loads current case studies from Contentful as a headless CMS through GraphQL",
  );
vacancyMatcher.caseStudy.plannedWork =
  "Next, I would expand the versioned evaluation set with more real vacancies and deliberately difficult language. Priority cases include negations, either-or requirements, conditional requirements, less common synonyms and requirements outside the current taxonomy. These additions should be implemented as regression fixtures before changing the matcher logic.";
const matcherImpact = [
  {
    title: "Current evaluation scope",
    description:
      "The current deterministic evaluation set covers Dutch and English frontend, full-stack, applied-AI and platform vacancies. It currently reports 100% requirement precision, requirement recall and evidence accuracy, with zero unsupported claims on that defined set.",
  },
  {
    title: "Known boundaries",
    description:
      "Unusual synonyms, complex negations, either-or conditions and technologies outside the current taxonomy may still require additional evaluation. The interface reports missing evidence instead of silently inventing a match.",
  },
];
vacancyMatcher.caseStudy.impact = [
  ...(vacancyMatcher.caseStudy.impact || []).filter(
    (item) => !matcherImpact.some((addition) => addition.title === item.title),
  ),
  ...matcherImpact,
];
content.candidateProfile = {
  seniority: "Senior",
  experienceYears: 8,
  languages: [
    { name: "Dutch", level: "Native" },
    { name: "English", level: "Fluent" },
    { name: "Cantonese", level: "Basic" },
  ],
  workArrangements: ["hybrid", "remote"],
};
const changed = content.projects
  .filter((project) => project.caseStudy)
  .map((project) => {
    const claims = verifiedClaims(project);
    project.caseStudy.verifiedClaims = claims;
    return { id: project.id, claims: claims.length };
  });

console.log(
  JSON.stringify(
    {
      mode: apply ? "apply" : "preview",
      candidateProfile: content.candidateProfile,
      changed,
    },
    null,
    2,
  ),
);
if (!apply) process.exit(0);

const update = await fetch(baseUrl, {
  method: "PUT",
  headers: { ...headers, "X-Contentful-Version": String(entry.sys.version) },
  body: JSON.stringify({ fields: entry.fields }),
});
if (!update.ok)
  throw new Error(`Contentful update failed with HTTP ${update.status}`);
const updated = await update.json();
const publish = await fetch(`${baseUrl}/published`, {
  method: "PUT",
  headers: {
    ...headers,
    "X-Contentful-Version": String(updated.sys.version),
  },
});
if (!publish.ok)
  throw new Error(`Contentful publish failed with HTTP ${publish.status}`);
console.log("Published verified matcher evidence to Contentful.");
