import type {
  MatcherServiceResponse,
  VacancyMatch,
} from "@portfolio/matcher-contracts";

type TrustedProject = {
  title: string;
  summary: string;
  evidence: string;
};

const requirementPatterns: Record<string, RegExp> = {
  React: /\breact(?:\.js)?\b/i,
  "Next.js": /\bnext(?:\.js|js)\b/i,
  TypeScript: /\btypescript\b/i,
  JavaScript: /\bjavascript\b/i,
  Vue: /\bvue(?:\.js|js|x)?\b/i,
  CSS: /\b(?:css|sass|styled.components|tailwind(?:css)?)\b/i,
  UX: /\b(?:ux|user experience|gebruikerservaring|gebruiksgemak)\b/i,
  Testing: /\b(?:jest|cypress|playwright|tests?|testing|testen)\b/i,
  Storybook: /\bstorybook\b/i,
  "Design system": /\b(?:design.?system|designsysteem)\b/i,
  Components: /\b(?:components?|componenten|herbruikbaar\w*|reusab\w*)\b/i,
  Collaboration:
    /\b(?:collaborat\w*|samenwerk\w*|designers?|stakeholders?|team)\b/i,
  AEM: /\baem\b/i,
  Accessibility: /\b(?:wcag|accessib\w*|toegankelijk\w*)\b/i,
  SEO: /\bseo\b/i,
  Python: /\bpython\b/i,
  AI: /\b(?:ai|artificial intelligence|kunstmatige intelligentie|gemini|openai|groq|claude|llms?|rag|pgvector|langchain|embeddings?|semantic search|vector search)\b/i,
  WordPress: /\bwordpress\b/i,
  Shopify: /\bshopify\b/i,
  "State management":
    /\b(?:redux|vuex|zustand|context api|state management)\b/i,
};

const collectStrings = (value: unknown): string[] => {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(collectStrings);
  if (value && typeof value === "object")
    return Object.values(value).flatMap(collectStrings);
  return [];
};

const findEvidenceExcerpt = (project: TrustedProject, requirement: string) => {
  const pattern = requirementPatterns[requirement];
  if (!pattern) return project.summary;

  try {
    const candidates = collectStrings(JSON.parse(project.evidence))
      .map((candidate) => candidate.trim())
      .filter((candidate) => candidate.length >= 2 && pattern.test(candidate))
      .sort((first, second) => first.length - second.length);
    if (!candidates[0]) return project.summary;
    const concreteAiEvidence =
      requirement === "AI"
        ? candidates.find(
            (candidate) =>
              candidate.length >= 40 &&
              /\b(?:gemini|openai|groq|claude|llms?|rag|pgvector|langchain|embeddings?|semantic search|vector search|ai integration|ai-assisted|ai toolchain|ai api|ai model|ai workflow|ai guardrails?)\b/i.test(
                candidate,
              ),
          )
        : undefined;
    if (concreteAiEvidence) return concreteAiEvidence;
    const substantiveEvidence = candidates.find(
      (candidate) => candidate.length >= 40,
    );
    if (substantiveEvidence) return substantiveEvidence;
    if (pattern.test(project.summary)) return project.summary;
    return candidates[0].length < 20
      ? `Verified case-study evidence: ${candidates[0]}.`
      : candidates[0];
  } catch {
    return project.summary;
  }
};

/**
 * This is an evidence-support score, not a model probability.
 * One verified case gives strong support; independent cases strengthen it.
 */
const evidenceConfidence = (sourceCount: number) => {
  if (sourceCount === 0) return 0;
  return sourceCount === 1 ? 85 : 95;
};

export const buildRequirementAnalysis = (
  result: MatcherServiceResponse,
  trustedProjects = new Map<string, TrustedProject>(),
): VacancyMatch["requirementAnalysis"] =>
  result.requirements.map((requirement) => {
    const evidence = result.matches
      .filter((match) => match.skills.includes(requirement))
      .map((match) => {
        const project = trustedProjects.get(match.id);
        return {
          projectId: match.id,
          projectTitle: project?.title || match.title,
          excerpt: project
            ? findEvidenceExcerpt(project, requirement)
            : match.evidence,
          relevance: `This verified case study explicitly supports the ${requirement} requirement.`,
        };
      });

    return {
      requirement,
      status: evidence.length ? "verified" : "missing",
      confidence: evidenceConfidence(evidence.length),
      evidence,
    };
  });
