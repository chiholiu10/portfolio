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
    source: "contribution" | "technology" | "impact" | "result";
  }>;
};

type CandidateProfile = {
  seniority: "Junior" | "Medior" | "Senior" | "Lead";
  experienceYears: number;
  languages: Array<{
    name: string;
    level: "Native" | "Fluent" | "Professional" | "Basic";
  }>;
  workArrangements: Array<"hybrid" | "remote" | "on-site">;
};

const findEvidenceClaim = (project: TrustedProject, requirement: string) =>
  project.claims.find((claim) => claim.skill === requirement);

const contributionLabel = (
  ownership: "individual" | "shared" | "team",
  source: TrustedProject["claims"][number]["source"],
) => {
  if (source === "technology") return "Listed technology";
  if (ownership === "individual") return "Individual contribution";
  if (ownership === "shared") return "Shared contribution";
  return "Team result";
};

/**
 * This is an evidence-support score, not a model probability.
 * One verified case gives strong support; independent cases strengthen it.
 */
const evidenceConfidence = (
  verifiedCount: number,
  transferableCount: number,
) => {
  if (verifiedCount > 0) return verifiedCount === 1 ? 85 : 95;
  if (transferableCount > 0) return transferableCount === 1 ? 65 : 75;
  return 0;
};

const evidenceStatus = (
  isProfileConstraint: boolean,
  verifiedCount: number,
  transferableCount: number,
  hasProfileMatch = false,
) => {
  if (hasProfileMatch) return "profile-match" as const;
  if (isProfileConstraint) return "not-assessed" as const;
  if (verifiedCount > 0) return "verified" as const;
  if (transferableCount > 0) return "transferable" as const;
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
  if (category === "seniority") {
    const levels = ["junior", "medior", "senior", "lead"];
    const requiredLevel = levels.indexOf(detail.toLowerCase());
    const profileLevel = levels.indexOf(profile.seniority.toLowerCase());
    if (requiredLevel < 0 || profileLevel < requiredLevel) return undefined;
    return `${profile.seniority} frontend profile with ${profile.experienceYears}+ years of professional experience.`;
  }
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
        const transfer = (match.transferableSkills || []).find(
          (item) => item.requirement === requirement,
        );
        const claim = project
          ? findEvidenceClaim(project, transfer?.evidenceSkill || requirement)
          : undefined;
        const level = transfer
          ? ("transferable" as const)
          : ("verified" as const);
        let relevance = `This verified case study explicitly supports the ${requirement} requirement.`;
        if (claim)
          relevance = `${contributionLabel(claim.ownership, claim.source)} in ${claim.context}.`;
        if (transfer)
          relevance = `Relevant ${transfer.evidenceSkill} experience in ${claim?.context || project?.title || match.title}; related to ${requirement}, but not direct ${requirement} experience.`;
        return {
          projectId: match.id,
          projectTitle: project?.title || match.title,
          excerpt: claim?.statement || project?.summary || match.evidence,
          relevance,
          level,
        };
      });
    const verifiedCount = evidence.filter(
      (item) => item.level === "verified",
    ).length;
    const transferableCount = evidence.length - verifiedCount;

    return {
      requirement,
      status: evidenceStatus(
        Boolean(isProfileConstraint),
        verifiedCount,
        transferableCount,
        Boolean(profileEvidence),
      ),
      confidence: evidenceConfidence(verifiedCount, transferableCount),
      evidence,
      ...(profileEvidence ? { profileEvidence } : {}),
    };
  });
