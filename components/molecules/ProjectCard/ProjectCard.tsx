import type { PortfolioProject } from "../../../lib/portfolio-projects";
import { PortfolioBlock, PortfolioCard as Card, PortfolioCardFooter, PortfolioImage, PortfolioLink } from "./ProjectCard.styles";

export const ProjectCard = ({ project, extraText }: { project: PortfolioProject; extraText?: string | null }) => (
  <Card>
    <PortfolioBlock>
      <PortfolioImage
        src={project.imageUrl}
        alt={`${project.title} frontend project`}
        width={700}
        height={394}
        sizes="(max-width: 767px) calc(100vw - 40px), 390px"
        quality={65}
        loading="lazy"
      />
    </PortfolioBlock>
    <PortfolioCardFooter>
      <h3>{project.title}</h3>
      <PortfolioLink href={`/project/${project.id}`}>
        {extraText} <span aria-hidden="true">↗</span>
      </PortfolioLink>
    </PortfolioCardFooter>
  </Card>
);
