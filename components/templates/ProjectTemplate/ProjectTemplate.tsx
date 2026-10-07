import Head from "next/head";
import {
  BackLink,
  ProjectContainer,
  ProjectHero,
  ProjectImage,
  ProjectMeta,
  ProjectPage,
  ProjectSection,
  ProjectVisual,
  TechnologyList,
} from "./ProjectCase.styles";
import {
  ProjectCaseStudy,
} from "../../../lib/portfolio-projects";

export type ProjectTemplateProps = {
  project: {
    id: string;
    title: string;
    imageUrl: string;
    caseStudy: ProjectCaseStudy;
  };
};

export function ProjectTemplate({ project }: ProjectTemplateProps) {
  const { caseStudy } = project;
  const pageUrl = `https://www.chiholiu.com/project/${project.id}`;
  const title = `${project.title} Frontend Project | Chiho Liu`;

  return (
    <>
      <Head>
        <title>{title}</title>
        {caseStudy.summary && <meta name="description" content={caseStudy.summary} />}
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={title} />
        {caseStudy.summary && <meta property="og:description" content={caseStudy.summary} />}
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={project.imageUrl} />
        <meta property="og:type" content="article" />
      </Head>
      <ProjectPage>
        <ProjectContainer>
          <BackLink href="/#portfolio">← Back to selected work</BackLink>
          <ProjectHero>
            <h1>{project.title}</h1>
            {caseStudy.summary && <p>{caseStudy.summary}</p>}
            <ProjectMeta>
              {caseStudy.role && <span>{caseStudy.role}</span>}
              {caseStudy.period && <span>{caseStudy.period}</span>}
            </ProjectMeta>
          </ProjectHero>

          <ProjectVisual>
            <ProjectImage
              src={project.imageUrl}
              alt={`${project.title} frontend project interface`}
              width={1969}
              height={1211}
              sizes="(max-width: 812px) calc(100vw - 32px), 780px"
              quality={90}
              priority
            />
          </ProjectVisual>

          {caseStudy.overview && (
            <ProjectSection><h2>Overview</h2><p>{caseStudy.overview}</p></ProjectSection>
          )}
          {caseStudy.problem && (
            <ProjectSection><h2>The problem</h2><p>{caseStudy.problem}</p></ProjectSection>
          )}
          {caseStudy.contribution && (
            <ProjectSection><h2>What I built</h2><p>{caseStudy.contribution}</p></ProjectSection>
          )}
          {caseStudy.technologies?.length && (
            <ProjectSection>
              <h2>Tech stack</h2>
              <TechnologyList>{caseStudy.technologies.map((item) => <li key={item}>{item}</li>)}</TechnologyList>
            </ProjectSection>
          )}
          {caseStudy.result && (
            <ProjectSection><h2>Result</h2><p>{caseStudy.result}</p></ProjectSection>
          )}
        </ProjectContainer>
      </ProjectPage>
    </>
  );
}

