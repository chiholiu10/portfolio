export type PortfolioProject = {
  id: string;
  title: string;
  imageUrl: string;
  suggestedQuestions?: string[];
};

type PortfolioDefinition = {
  id: string;
  title: string;
  imageMatch: string;
  keywords: string[];
  suggestedQuestions?: string[];
};

const projectDefinitions: PortfolioDefinition[] = [
  {
    id: "code-stackers",
    title: "CodeStackers",
    imageMatch: "CodeStackers",
    keywords: ["codestackers"],
  },
  {
    id: "veliche-chocolate",
    title: "Veliche Chocolate",
    imageMatch: "Veliche_Chocolate",
    keywords: ["veliche", "chocolate"],
  },
  {
    id: "gemeente-amsterdam-vue",
    title: "Gemeente Amsterdam",
    imageMatch: "Gemeente_Amsterdam",
    keywords: [
      "gemeente",
      "amsterdam",
      "accessibility",
      "vue",
      "wcag",
      "legacy",
    ],
    suggestedQuestions: [
      "Wat was Chiho's bijdrage aan dit project?",
      "Waarom was zijn bijdrage belangrijk voor gebruikers?",
      "Wat was zijn technische aanpak?",
      "Hoe werkte Chiho samen met het team?",
      "Hoe verbeterde hij de developer workflow?",
      "Hoe werden Chart.js en parkeerdata gebruikt?",
    ],
  },
  { id: "rebels", title: "Rebels", imageMatch: "Rebels", keywords: ["rebels"] },
  { id: "npo", title: "NPO", imageMatch: "npo_", keywords: ["npo"] },
  {
    id: "florin-international",
    title: "Florin International",
    imageMatch: "Florin-international",
    keywords: ["florin"],
  },
  {
    id: "cryptohopper",
    title: "Cryptohopper",
    imageMatch: "Cryptohopper",
    keywords: ["cryptohopper", "crypto"],
  },
  {
    id: "success-factory",
    title: "Success Factory",
    imageMatch: "Success_Factory",
    keywords: ["success factory"],
  },
  {
    id: "anders-reizen",
    title: "Anders Reizen",
    imageMatch: "Anders_Reizen",
    keywords: ["anders reizen"],
  },
  {
    id: "ticket-factory",
    title: "Ticket Factory",
    imageMatch: "Ticket_Factory",
    keywords: ["ticket factory"],
  },
  {
    id: "rembrandt-bouw",
    title: "Rembrandt Bouw",
    imageMatch: "rembrandtbouw",
    keywords: ["rembrandt", "freelance", "stockload"],
  },
  {
    id: "new-home-decorations",
    title: "New Home Decorations",
    imageMatch: "newhomedecorations",
    keywords: ["new home decorations", "freelance", "stockload"],
  },
  {
    id: "cinewall-deco",
    title: "Cinewall Deco",
    imageMatch: "cinewalldeco",
    keywords: ["cinewall", "freelance", "stockload"],
  },
  {
    id: "portfolio-showcase",
    title: "Portfolio Showcase",
    imageMatch: "Group_6_1",
    keywords: ["portfolio"],
  },
  {
    id: "momants-ai-agent",
    title: "Momants.ai Agent",
    imageMatch: "AI-agent-momants",
    keywords: ["momants", "ai", "agent", "accessibility", "wcag"],
  },
  {
    id: "tours-tickets-dashboard",
    title: "Tours & Tickets Dashboard",
    imageMatch: "Tours-and-tickets-dashboard",
    keywords: ["tours", "tickets", "dashboard"],
  },
  {
    id: "momants-homepage",
    title: "Momants.ai Homepage",
    imageMatch: "momants-homepage",
    keywords: ["momants", "ai", "homepage", "accessibility", "wcag"],
  },
  {
    id: "berkays-barbershop",
    title: "Berkay's Barbershop",
    imageMatch: "berkaysbarbershop",
    keywords: ["berkay", "barbershop", "freelance", "stockload"],
  },
];

export const createPortfolioProjects = (
  items: Array<{ secure_url: string }>,
): PortfolioProject[] =>
  items.map((item, index) => {
    const definition = projectDefinitions.find((candidate) =>
      item.secure_url.includes(candidate.imageMatch),
    );

    return {
      id: definition?.id || `portfolio-project-${index + 1}`,
      title: definition?.title || `Portfolio project ${index + 1}`,
      imageUrl: item.secure_url,
      suggestedQuestions: definition?.suggestedQuestions,
    };
  });

export const recommendPortfolioProjectIds = (question: string) => {
  const normalizedQuestion = question.toLowerCase();

  if (/\b(?:vertel|tell|explain|leg uit)\b.{0,50}\bproject\b/i.test(question)) {
    return [];
  }

  const matched = projectDefinitions.filter((project) =>
    project.keywords.some((keyword) => normalizedQuestion.includes(keyword)),
  );

  if (
    /\b(?:favoriet|favorite|favourite|leukst|meest trots|best project)\b/i.test(
      question,
    )
  ) {
    return ["momants-ai-agent", "gemeente-amsterdam", "cryptohopper"];
  }

  return matched.slice(0, 3).map((project) => project.id);
};
