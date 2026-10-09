import Link from "next/link";
import type { PortfolioProject } from "@/lib/portfolio-projects";
import { PortfolioBlock, PortfolioCard as Card, PortfolioCardFooter, PortfolioImage } from "@/components/molecules/ProjectCard/ProjectCard.styles";

export const ProjectCard = ({ project }: { project: PortfolioProject; extraText?: string | null }) => (
  <Card>
    <Link href={`/project/${project.id}`} aria-label={`View ${project.title}`} style={{ display: "block" }}>
    <PortfolioBlock>
      <PortfolioImage
        src={project.imageUrl}
        alt={`${project.title} frontend project`}
        width={700}
        height={394}
        sizes="(max-width: 600px) calc(100vw - 40px), (max-width: 1024px) 46vw, (max-width: 1184px) 30vw, 358px"
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
