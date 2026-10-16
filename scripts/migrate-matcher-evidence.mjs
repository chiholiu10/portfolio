import process from "node:process";

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

const skills = {
  React: /\breact(?:\.js)?\b/i,
  "Next.js": /\bnext(?:\.js|js)\b/i,
  TypeScript: /\btypescript\b/i,
  JavaScript: /\bjavascript\b/i,
  Vue: /\bvue(?:\.js|js)?\b/i,
  CSS: /\b(?:css|sass|styled-components|tailwind(?: css)?)\b/i,
  UX: /\b(?:ux|user experience|usability|shopping experience)\b/i,
  Testing: /\b(?:jest|cypress|playwright|test(?:ing|s)?)\b/i,
  Storybook: /\bstorybook\b/i,
  "Design system": /\bdesign[ -]?system\b/i,
  Components: /\b(?:components?|reusable)\b/i,
  Collaboration: /\b(?:collaborat\w*|designers?|stakeholders?|team)\b/i,
  AEM: /\b(?:aem|adobe experience manager)\b/i,
  Accessibility: /\b(?:wcag|accessib\w*)\b/i,
  SEO: /\bseo\b/i,
  Python: /\bpython\b/i,
  AI: /\b(?:gemini|llm|ai integration|ai model|applied ai)\b/i,
  WordPress: /\bwordpress\b/i,
  Shopify: /\bshopify\b/i,
  "State management": /\b(?:redux|vuex|zustand|context api|shared state)\b/i,
  "Full-stack":
    /\b(?:full[ -]?stack|end[ -]to[ -]end product flow|private python service)\b/i,
  APIs: /\b(?:apis?|fastapi|server-side gateway)\b/i,
  Integrations: /\b(?:integrations?|integrat(?:e|ed|ing)|fresha|ga4)\b/i,
  "Client-facing": /\b(?:customers?|clients?|stakeholders?)\b/i,
  "Business impact":
    /\b(?:business (?:value|impact|positioning)|conversion|growth|organic search|measurable)\b/i,
  "Product ownership":
    /\b(?:designed and built|end[ -]to[ -]end product flow|independent portfolio product)\b/i,
};

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
    ...sentences(scope.overview).map((statement) => ({
      statement,
      source: "contribution",
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
  return Object.entries(skills).flatMap(([skill, pattern]) => {
    const evidence = sources.find(({ statement }) => pattern.test(statement));
    const technology = (scope.technologies || []).find((item) =>
      pattern.test(item),
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
content.candidateProfile = {
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
