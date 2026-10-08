import Link from "next/link";
import type { PortfolioProject } from "../../../lib/portfolio-projects";
import { PortfolioBlock, PortfolioCard as Card, PortfolioCardFooter, PortfolioImage } from "./ProjectCard.styles";

export const ProjectCard = ({ project }: { project: PortfolioProject; extraText?: string | null }) => (
  <Card>
    <Link href={`/project/${project.id}`} aria-label={`View ${project.title}`} style={{ display: "block" }}>
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
    </Link>
    <PortfolioCardFooter>
      <h3>{project.title}</h3>
    </PortfolioCardFooter>
  </Card>
);
