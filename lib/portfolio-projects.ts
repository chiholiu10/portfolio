import type { PortfolioContent } from "./content-model";

export type { PortfolioContent, ProjectCaseStudy } from "./content-model";

export type PortfolioProject = {
  id: string;
  title: string;
  imageUrl: string;
  suggestedQuestions?: string[];
};

export const createPortfolioProjects = (
  items: Array<{ secure_url: string }>,
  content: PortfolioContent,
): PortfolioProject[] =>
  items.flatMap((item) => {
    const matches = content.projects.filter((project) => item.secure_url.includes(project.imageMatch));
    if (matches.length !== 1) {
      throw new Error("Each portfolio image must match exactly one Contentful project.");
    }
    const [definition] = matches;
    if (definition.archived) return [];
    return [{
      id: definition.id,
title: definition.title,
imageUrl: item.secure_url,
      ...(definition.suggestedQuestions ? { suggestedQuestions: definition.suggestedQuestions } : {}),
    }];
  });

export const recommendPortfolioProjectIds = (question: string, content: PortfolioContent) => {
  const normalizedQuestion = question.toLowerCase();

  if (/\b(?:vertel|tell|explain|leg uit)\b.{0,50}\bproject\b/i.test(question)) {
    return [];
  }

  const matched = content.projects.filter((project) =>
    !project.archived && project.keywords.some((keyword) => normalizedQuestion.includes(keyword.toLowerCase())),
  );

  if (
    /\b(?:favoriet|favorite|favourite|leukst|meest trots|best project)\b/i.test(
      question,
    )
  ) {
    return (content.favoriteProjectIds || []).filter((id) => content.projects.some((project) => project.id === id && !project.archived));
  }

  return matched.slice(0, 3).map((project) => project.id);
};
