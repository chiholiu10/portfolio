import { breakpoint } from "@/styles/Breakpoint";
import styled from "styled-components";
import type { HomeSections } from "@/lib/content-model";
import { SectionHeading } from "@/components/molecules/SectionHeading/SectionHeading";
import { createPortfolioProjects } from "@/lib/portfolio-projects";
import { ComponentSection } from "@/styles/General.styles";
import { StaggerItem, StaggerGroup } from "@/components/atoms/Motion";
import { ProjectCard } from "@/components/molecules/ProjectCard/ProjectCard";

const PortfolioSection = styled(ComponentSection)`
  min-height: auto;
  padding-bottom: 64px;
`;
const PortfolioGrid = styled.div.attrs({ className: "ui-div" })`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  width: calc(100% - 40px);
  margin: 0 auto;
  > :where(.ui-div) {
    min-width: 0;
  }
  ${breakpoint.sm`
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 40px;
  `}
  ${breakpoint.xl`
    width: min(1120px, calc(100% - 64px));
  `}
  ${breakpoint.xxl`
    grid-template-columns: repeat(3, minmax(0, 1fr));
  `}
`;

type PortfolioProps = { data: HomeSections["portfolio"] };

export const Portfolio = ({ data }: PortfolioProps) => {
  const { section } = data;

  if (!section) {
    return null;
  }

  const { title, subtitle, extraText, array, arrays } = section;
  const projects = createPortfolioProjects(array, arrays);

  return (
    <PortfolioSection id="portfolio" className="portfolioComponent">
      <SectionHeading
        id="portfolio-section"
        title={title}
        subtitle={subtitle}
        eyebrow={section.eyebrow}
      />
      <StaggerGroup>
        <PortfolioGrid>
          {projects.map((project) => (
            <StaggerItem key={project.id}>
              <ProjectCard project={project} extraText={extraText} />
            </StaggerItem>
          ))}
        </PortfolioGrid>
      </StaggerGroup>
    </PortfolioSection>
  );
};
