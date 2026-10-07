import type { HomeSections } from "../../../lib/content-model";
import { SectionHeading } from "../../molecules/SectionHeading/SectionHeading";
import { m, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { createPortfolioProjects } from "../../../lib/portfolio-projects";
import {
  BackgroundImage,
  ComponentSection,
  DisplayFlex,
} from "../../../styles/General.styles";
import {
  StaggerItem,
  StaggerGroup,
} from "../../atoms/Motion";
import { ProjectCard } from "../../molecules/ProjectCard/ProjectCard";

type PortfolioProps = { data: HomeSections["portfolio"] };

export const Portfolio = ({ data }: PortfolioProps) => {
  const { scrollY } = useScroll();
  const y2 = useTransform(scrollY, [0, 7000], [1, -1000]);

  const { section } = data;

  if (!section) {
    return null;
  }

  const { title, subtitle, extraText, array, arrays } = section;
  const projects = createPortfolioProjects(array, arrays);

  return (
    <ComponentSection id="portfolio" className="portfolioComponent">
      <m.div style={{ y: y2, x: 0 }}>
        <BackgroundImage $left="60%">
          <Image
            src={
              "https://res.cloudinary.com/dh7tnzzxm/image/upload/v1651443884/circle_effect_8ce52c0de3.png"
            }
            width={612}
            height={612}
            sizes="(min-width: 768px) 40vw, 1px"
            style={{ width: "100%", height: "auto" }}
            loading="lazy"
            alt="background-image-effect"
          />
        </BackgroundImage>
      </m.div>
      <SectionHeading id="portfolio-section" title={title} subtitle={subtitle} />
      <StaggerGroup>
        <DisplayFlex>
          {projects.map((project) => (
            <StaggerItem key={project.id}>
              <ProjectCard project={project} extraText={extraText} />
            </StaggerItem>
          ))}
        </DisplayFlex>
      </StaggerGroup>
    </ComponentSection>
  );
};
