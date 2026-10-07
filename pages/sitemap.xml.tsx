import type { GetServerSideProps } from "next";
import { createSitemap } from "../lib/sitemap";
import { createPortfolioProjects } from "../lib/portfolio-projects";
import { loadPortfolioSection } from "../lib/contentful/portfolio";

export default function Sitemap() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const section = await loadPortfolioSection();
  const projects = createPortfolioProjects(section.array, section.arrays);
  const sitemap = createSitemap([
    { path: "/" },
    ...projects.map(({ id }) => ({ path: `/project/${id}` })),
  ]);

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=86400",
  );
  res.write(sitemap);
  res.end();

  return { props: {} };
};
