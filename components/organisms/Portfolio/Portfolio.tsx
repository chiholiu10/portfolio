import styled from "styled-components";
import type { HomeSections } from "@/lib/content-model";
import { SectionHeading } from "@/components/molecules/SectionHeading/SectionHeading";
import { createPortfolioProjects } from "@/lib/portfolio-projects";
import {
  ComponentSection,
} from "@/styles/General.styles";
import {
  StaggerItem,
  StaggerGroup,
} from "@/components/atoms/Motion";
import { ProjectCard } from "@/components/molecules/ProjectCard/ProjectCard";

const PortfolioSection = styled(ComponentSection)`
  min-height: auto;
  padding-bottom: 64px;
`;
const PortfolioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 40px;
  width: min(1120px, calc(100% - 64px));
  margin: 0 auto;
  > div { min-width: 0; }
  @media (min-width: 601px) and (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 40px;
  }
  @media (max-width: 850px) { width: calc(100% - 40px); }
  @media (max-width: 600px) { grid-template-columns: 1fr; gap: 24px; }
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
      <SectionHeading id="portfolio-section" title={title} subtitle={subtitle} eyebrow={section.eyebrow} />
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
