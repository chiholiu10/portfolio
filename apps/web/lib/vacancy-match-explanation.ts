import type {
  MatcherServiceResponse,
  VacancyMatch,
} from "@portfolio/matcher-contracts";

type TrustedProject = {
  title: string;
  summary: string;
  claims: Array<{
    skill: string;
    statement: string;
    context: string;
    ownership: "individual" | "shared" | "team";
  }>;
};

type CandidateProfile = {
  experienceYears: number;
  languages: Array<{
    name: string;
    level: "Native" | "Fluent" | "Professional" | "Basic";
  }>;
  workArrangements: Array<"hybrid" | "remote" | "on-site">;
};

const findEvidenceClaim = (project: TrustedProject, requirement: string) =>
  project.claims.find((claim) => claim.skill === requirement);

const contributionLabel = (ownership: "individual" | "shared" | "team") => {
  if (ownership === "individual") return "Individual contribution";
  if (ownership === "shared") return "Shared contribution";
  return "Team result";
};

/**
 * This is an evidence-support score, not a model probability.
 * One verified case gives strong support; independent cases strengthen it.
 */
const evidenceConfidence = (sourceCount: number) => {
  if (sourceCount === 0) return 0;
  return sourceCount === 1 ? 85 : 95;
};

const evidenceStatus = (
  isProfileConstraint: boolean,
  sourceCount: number,
  hasProfileMatch = false,
) => {
  if (hasProfileMatch) return "profile-match" as const;
  if (isProfileConstraint) return "not-assessed" as const;
  if (sourceCount > 0) return "verified" as const;
  return "missing" as const;
};

const normalizedLanguage = (language: string) => {
  const aliases: Record<string, string> = {
    nederlands: "dutch",
    engels: "english",
  };
  const normalized = language.toLowerCase();
  return aliases[normalized] || normalized;
};

const profileMatch = (
  category: MatcherServiceResponse["requirementDetails"][number]["category"],
  detail: string | undefined,
  profile: CandidateProfile | undefined,
) => {
  if (!profile || !detail) return undefined;
  if (category === "experience") {
    const requiredYears = Number.parseInt(detail, 10);
    if (Number.isNaN(requiredYears) || profile.experienceYears < requiredYears)
      return undefined;
    return `${profile.experienceYears}+ years of professional experience.`;
  }
  if (category === "language") {
    const language = profile.languages.find(
      (item) => normalizedLanguage(item.name) === normalizedLanguage(detail),
    );
    return language ? `${language.name}: ${language.level}.` : undefined;
  }
  if (category === "work-arrangement") {
    const requested = detail
      .split("/")
      .map((item) => item.trim().replace("on site", "on-site"));
    const matched = requested.filter((item) =>
      profile.workArrangements.includes(
        item as CandidateProfile["workArrangements"][number],
      ),
    );
    if (!matched.length) return undefined;
    return `Available for ${matched.join(" and ")} work.`;
  }
  return undefined;
};

export const buildRequirementAnalysis = (
  result: MatcherServiceResponse,
  trustedProjects = new Map<string, TrustedProject>(),
  candidateProfile?: CandidateProfile,
): VacancyMatch["requirementAnalysis"] =>
  result.requirements.map((requirement) => {
    const detail = result.requirementDetails.find(
      (item) => item.name === requirement,
    );
    const isProfileConstraint =
      detail &&
      ["seniority", "experience", "language", "work-arrangement"].includes(
        detail.category,
      );
    const profileEvidence = detail
      ? profileMatch(detail.category, detail.detail, candidateProfile)
      : undefined;
    const evidence = result.matches
      .filter((match) => match.skills.includes(requirement))
      .map((match) => {
        const project = trustedProjects.get(match.id);
        const claim = project
          ? findEvidenceClaim(project, requirement)
          : undefined;
        return {
          projectId: match.id,
          projectTitle: project?.title || match.title,
          excerpt: claim?.statement || project?.summary || match.evidence,
          relevance: claim
            ? `${contributionLabel(claim.ownership)} in ${claim.context}.`
            : `This verified case study explicitly supports the ${requirement} requirement.`,
        };
      });

    return {
      requirement,
      status: evidenceStatus(
        Boolean(isProfileConstraint),
        evidence.length,
        Boolean(profileEvidence),
      ),
      confidence: evidenceConfidence(evidence.length),
      evidence,
      ...(profileEvidence ? { profileEvidence } : {}),
    };
  });
