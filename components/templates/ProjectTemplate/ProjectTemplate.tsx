import { BrandOrbit, NavbarComponent, NavbarInnerBlock } from "@/components/organisms/Navbar/Navbar.styles";
import Head from "next/head";
import Link from "next/link";
import {
  ProjectContainer,
  ProjectNavigation,
  ImpactList,
  AdditionalProject,
  ProjectCopy,
  ProjectEvidence,
  ProjectHero,
  ProjectImage,
  ProjectMeta,
  ProjectPage,
  ProjectSection,
  ProjectVisual,
  TechnologyList,
} from "@/components/templates/ProjectTemplate/ProjectCase.styles";
import {
  ProjectCaseStudy,
} from "@/lib/portfolio-projects";

const CaseText = ({ text }: { text: string }) => (
  <ProjectCopy>{text.split(/\n\s*\n/).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</ProjectCopy>
);

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
      <NavbarComponent aria-label="Project navigation">
        <ProjectNavigation>
          <NavbarInnerBlock href="/" aria-label="Chiho Liu homepage">
            <BrandOrbit aria-hidden="true">CL</BrandOrbit>
            <span className="brand-copy">
              <span className="brand">Chiho Liu</span>
              <span className="role">Front-end × UX × AI</span>
            </span>
          </NavbarInnerBlock>
          <div className="nav-links"><Link href="/">← Homepage</Link><Link href="/#contact">Let’s talk</Link></div>
        </ProjectNavigation>
      </NavbarComponent>
      <ProjectPage>
        <ProjectContainer>
          <ProjectHero>
            <h1>{project.title}</h1>
            {caseStudy.summary && <p>{caseStudy.summary}</p>}
            <ProjectMeta>
              {caseStudy.role && <span>{caseStudy.role}</span>}
              {caseStudy.period && <span>{caseStudy.period}</span>}
              {caseStudy.workScope && <span>{caseStudy.workScope}</span>}
            </ProjectMeta>
          </ProjectHero>

          <ProjectVisual>
            <ProjectImage
              src={project.imageUrl}
              alt={`${project.title} frontend project interface`}
              width={1969}
              height={1211}
              sizes="(max-width: 812px) calc(100vw - 40px), 920px"
              quality={90}
              priority
            />
          </ProjectVisual>

          {caseStudy.overview && (
            <ProjectSection><h2>Overview</h2><CaseText text={caseStudy.overview} /></ProjectSection>
          )}
          {caseStudy.problem && (
            <ProjectSection><h2>The problem</h2><CaseText text={caseStudy.problem} /></ProjectSection>
          )}
          {caseStudy.contribution && (
            <ProjectSection><h2>My contribution</h2><CaseText text={caseStudy.contribution} /></ProjectSection>
          )}
          {caseStudy.plannedWork && (
            <ProjectSection><h2>Planned work</h2><CaseText text={caseStudy.plannedWork} /></ProjectSection>
          )}
          {caseStudy.technologies?.length && (
            <ProjectSection>
              <h2>Tech stack</h2>
              <TechnologyList>{caseStudy.technologies.map((item) => <li key={item}>{item}</li>)}</TechnologyList>
            </ProjectSection>
          )}
          {!!caseStudy.impact?.length && (
            <ProjectSection><h2>Impact</h2>
              <ImpactList>{caseStudy.impact.map((item) => (
                <li key={item.title}><h3>{item.title}</h3><p>{item.description}</p></li>
              ))}</ImpactList>
            </ProjectSection>
          )}
          {!caseStudy.impact?.length && caseStudy.result && (
            <ProjectSection><h2>Result</h2><CaseText text={caseStudy.result} /></ProjectSection>
          )}
          {caseStudy.additionalProjects?.map((item) => (
            <AdditionalProject key={item.title} aria-label={item.title}>
              <h2>{item.title}</h2>
              <p>{item.overview}</p>
              <ProjectSection><h3>My contribution</h3><CaseText text={item.contribution} /></ProjectSection>
              <ProjectSection><h3>Tech stack</h3><TechnologyList>{item.technologies.map((tech) => <li key={tech}>{tech}</li>)}</TechnologyList></ProjectSection>
              <ProjectSection><h3>Impact</h3><ImpactList>{item.impact.map((impact) => <li key={impact.title}><h4>{impact.title}</h4><p>{impact.description}</p></li>)}</ImpactList></ProjectSection>
            </AdditionalProject>
          ))}
          {caseStudy.evidence?.map((item) => (
            <ProjectEvidence key={item.imageUrl}>
              <ProjectImage src={item.imageUrl} alt={item.alt}
                width={item.width} height={item.height}
                sizes="(max-width: 812px) calc(100vw - 40px), 920px" quality={90} />
              <figcaption>{item.caption}</figcaption>
            </ProjectEvidence>
          ))}
        </ProjectContainer>
      </ProjectPage>
    </>
  );
}
