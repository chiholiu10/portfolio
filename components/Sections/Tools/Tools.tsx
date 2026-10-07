import Image from "next/image";
import {
  ComponentSection,
  Header,
  SubHeader,
} from "../../../styles/General.styles";
import { FadeUp, StaggerItem, WordReveal } from "../../FramerMotions";
import {
  ToolInnerBlock,
  ToolsBlock,
  ToolsCategory,
  ToolsCategoryHeader,
  ToolsGrid,
  ToolsHeader,
} from "./Tools.styles";
import { StaggerGroup } from "../../FramerMotions/StaggerGroup";

type ToolsProps = {
  data: {
    section: {
      title?: string | null;
      subtitle?: string | null;
      extraText?: string | null;
      arrayBlockCollection?: {
        items: { url: string; title?: string | null }[];
      } | null;
    } | null;
  };
};

type ToolItem = {
  url: string;
  title?: string | null;
};

const additionalTools: ToolItem[] = [
  { title: "Codex", url: "/tools/codex.svg" },
  { title: "GitHub", url: "/tools/github.svg" },
  { title: "GitLab", url: "/tools/gitlab.svg" },
  { title: "Node.js", url: "/tools/nodejs.svg" },
];

const toolCategories = [
  {
    title: "Core expertise",
    description: "Technologies I use as the foundation of my frontend work.",
    tools: ["React", "TypeScript", "JavaScript", "styled-component", "Sass"],
  },
  {
    title: "Production experience",
    description: "Frameworks and tools I have used to ship and maintain products.",
    tools: [
      "Next",
      "Vue",
      "Nuxt",
      "Redux",
      "Pinia",
      "Zustand",
      "Jest",
      "Cypress",
      "Playwright",
      "Webpack",
      "Docker",
      "Tailwind CSS",
      "Codex",
      "GitHub",
      "GitLab",
    ],
  },
  {
    title: "Familiar with",
    description: "Additional technologies I use while expanding my wider engineering experience.",
    tools: ["Python", "FastAPI", "Node.js"],
  },
] as const;

const normalizeToolName = (title?: string | null) =>
  title?.trim().toLowerCase() || "";

const groupTools = (items: ToolItem[]) => {
  const assignedTools = new Set<string>();
  const categories = toolCategories.map((category) => {
    const tools = category.tools
      .map((toolName) =>
        items.find(
          (item) => normalizeToolName(item.title) === toolName.toLowerCase(),
        ),
      )
      .filter((item): item is ToolItem => Boolean(item));

    tools.forEach((tool) => assignedTools.add(normalizeToolName(tool.title)));

    return { ...category, tools };
  });
  const uncategorizedTools = items.filter(
    (item) => !assignedTools.has(normalizeToolName(item.title)),
  );

  if (uncategorizedTools.length > 0) {
    categories[1].tools.push(...uncategorizedTools);
  }

  return categories;
};

export const Tools = ({ data }: ToolsProps) => {
  const { section } = data;

  if (!section) {
    return <ComponentSection>No data available</ComponentSection>;
  }

  const { title, subtitle, arrayBlockCollection } = section;
  const contentfulItems = arrayBlockCollection?.items || [];
  const existingToolNames = new Set(
    contentfulItems.map((item) => normalizeToolName(item.title)),
  );
  const items = [
    ...contentfulItems,
    ...additionalTools.filter(
      (item) => !existingToolNames.has(normalizeToolName(item.title)),
    ),
  ];
  const categories = groupTools(items);
  let toolIndex = 0;

  return (
    <ComponentSection>
      <FadeUp id="tools-section">
        <Header>{title}</Header>
        <SubHeader>
          <WordReveal text={subtitle} />
        </SubHeader>
      </FadeUp>
      <StaggerGroup>
        {categories.map((category) => (
          <ToolsCategory key={category.title}>
            <ToolsCategoryHeader>
              <h3>{category.title}</h3>
              <p>{category.description}</p>
            </ToolsCategoryHeader>
            <ToolsGrid>
              {category.tools.map((item) => {
                const index = toolIndex;
                toolIndex += 1;

                return (
                  <StaggerItem key={item.title || item.url}>
                    <ToolsBlock $index={index}>
                      <ToolInnerBlock>
                        <Image
                          src={item.url}
                          alt={item.title || `Tool ${index + 1}`}
                          width={40}
                          height={40}
                          loading="lazy"
                        />
                      </ToolInnerBlock>
                      <ToolsHeader>
                        <h4>{item.title}</h4>
                      </ToolsHeader>
                    </ToolsBlock>
                  </StaggerItem>
                );
              })}
            </ToolsGrid>
          </ToolsCategory>
        ))}
      </StaggerGroup>
    </ComponentSection>
  );
};
