import { responsiveImageSizes } from "@/styles/Breakpoint";
import Link from "next/link";
import type { PortfolioProject } from "@/lib/portfolio-projects";
import {
  PortfolioBlock,
  PortfolioCard as Card,
  PortfolioCardFooter,
  PortfolioImage,
} from "@/components/molecules/ProjectCard/ProjectCard.styles";

export const ProjectCard = ({
  project,
}: {
  project: PortfolioProject;
  extraText?: string | null;
}) => (
  <Card>
    <Link
      className="ui-a"
      href={`/project/${project.id}`}
      aria-label={`View ${project.title}`}
      style={{ display: "block" }}
    >
      <PortfolioBlock>
        <PortfolioImage
          src={project.imageUrl}
          alt={`${project.title} frontend project`}
          width={700}
          height={394}
          sizes={responsiveImageSizes(
            { xxxl: "358px", xxl: "30vw", sm: "46vw" },
            "calc(100vw - 40px)",
          )}
          quality={65}
          loading="lazy"
        />
      </PortfolioBlock>
    </Link>
    <PortfolioCardFooter>
      <h3 className="ui-h3">{project.title}</h3>
    </PortfolioCardFooter>
  </Card>
);
