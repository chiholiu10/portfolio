import Head from "next/head";
import Link from "next/link";
import { VacancyMatcher } from "@/components/organisms/VacancyMatcher/VacancyMatcher";

import type { GetStaticProps, InferGetStaticPropsType } from "next";
import type { HomeSections } from "@/lib/content-model";
import { loadVacancyMatcherSection } from "@/lib/contentful/home";

export const getStaticProps: GetStaticProps<{
  data: HomeSections["vacancyMatcher"];
}> = async () => ({
  props: { data: await loadVacancyMatcherSection() },
  revalidate: 3600,
});

export default function MatchPage({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!data.section) return null;
  const copy = data.section.arrays;
  return (
    <>
      <Head>
        <title>{copy.pageTitle}</title>
        <meta name="description" content={copy.pageDescription} />
      </Head>
      <VacancyMatcher data={data} />
      <Link
        href="/#vacancy-match"
        style={{
          display: "block",
          textAlign: "center",
          color: "#245ce0",
          marginBottom: 40,
        }}
      >
        {copy.homeLink}
      </Link>
    </>
  );
}
