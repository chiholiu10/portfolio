import { additionalTools, normalizeToolName, groupTools } from "@/lib/tools";
import type { HomeSections } from "@/lib/content-model";
import { SectionHeading } from "@/components/molecules/SectionHeading/SectionHeading";
import Image from "next/image";
import {
  ComponentSection,
} from "@/styles/General.styles";
import { StaggerItem } from "@/components/atoms/Motion";
import {
  ToolInnerBlock,
  ToolsBlock,
  ToolsCategory,
  ToolsCategoryHeader,
  ToolsGrid,
  ToolsHeader,
} from "@/components/organisms/Tools/Tools.styles";
import { StaggerGroup } from "@/components/atoms/Motion/StaggerGroup";

type ToolsProps = { data: HomeSections["tools"] };

export const Tools = ({ data }: ToolsProps) => {
  const { section } = data;

  if (!section) {
    return null;
  }

  const {
    arrays: toolCategories = [],
    title,
    subtitle,
    arrayBlockCollection,
  } = section;
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
  const categories = groupTools(items, toolCategories || []);

  return (
    <ComponentSection>
      <SectionHeading id="tools-section" title={title} subtitle={subtitle} eyebrow={section.eyebrow} />
      <StaggerGroup>
        {categories.map((category, categoryIndex) => (
          <ToolsCategory key={category.title}>
            <ToolsCategoryHeader>
              <h3>{category.title}</h3>
              <p>{category.description}</p>
            </ToolsCategoryHeader>
            <ToolsGrid>
              {category.tools.map((item, itemIndex) => {
                const index = categories.slice(0, categoryIndex).reduce((total, previous) => total + previous.tools.length, 0) + itemIndex;

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
