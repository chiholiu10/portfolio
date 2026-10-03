import type { GetServerSideProps } from "next";
import { createSitemap } from "../lib/sitemap";

export default function Sitemap() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const sitemap = createSitemap([
    { path: "/" },
    { path: "/senior-frontend-developer" },
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
