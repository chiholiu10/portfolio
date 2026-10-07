import type { GetStaticPaths, GetStaticProps } from "next";
import { ProjectTemplate, ProjectTemplateProps } from "../../components/templates/ProjectTemplate/ProjectTemplate";
import { createPortfolioProjects } from "../../lib/portfolio-projects";

export default ProjectTemplate;

export const getStaticPaths: GetStaticPaths = async () => {
  const { loadPortfolioSection } = await import("../../lib/contentful/portfolio");
  const section = await loadPortfolioSection();
  return {
    paths: createPortfolioProjects(section.array, section.arrays).map(({ id }) => ({ params: { slug: id } })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<ProjectTemplateProps> = async ({ params }) => {
  const { loadPortfolioSection } = await import("../../lib/contentful/portfolio");
  const section = await loadPortfolioSection();
  const project = createPortfolioProjects(section.array, section.arrays).find(({ id }) => id === params?.slug);
  if (!project) return { notFound: true, revalidate: 3600 };
  return {
    props: {
      project: {
        id: project.id,
        title: project.title,
        imageUrl: project.imageUrl,
        caseStudy: section.arrays.projects.find(({ id }) => id === project.id)?.caseStudy || {},
      },
    },
    revalidate: 3600,
  };
};
