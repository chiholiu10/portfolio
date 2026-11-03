import type { GetServerSideProps } from "next";
import {
  createPortfolioProjects,
  isIndexablePortfolioProject,
} from "@/lib/portfolio-projects";
import { createSitemap } from "@/lib/sitemap";

export default function Sitemap() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const { loadPortfolioSection } = await import("@/lib/contentful/portfolio");
  const section = await loadPortfolioSection();
  const availableProjectIds = new Set(
    createPortfolioProjects(section.array, section.arrays).map(({ id }) => id),
  );
  const projectEntries = section.arrays.projects
    .filter(
      (project) =>
        availableProjectIds.has(project.id) &&
        isIndexablePortfolioProject(project),
    )
    .map(({ id }) => ({ path: `/project/${id}` }));
  const sitemap = createSitemap([{ path: "/" }, ...projectEntries]);

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=86400",
  );
  res.write(sitemap);
  res.end();

  return { props: {} };
};
