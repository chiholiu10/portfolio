import Head from "next/head";
import Link from "next/link";
import { VacancyMatcher } from "@/components/organisms/VacancyMatcher/VacancyMatcher";

export default function MatchPage() {
  return (
    <>
      <Head>
        <title>Vacancy matcher | Chiho Liu</title>
        <meta
          name="description"
          content="Discover which of Chiho Liu's projects are relevant to your vacancy."
        />
      </Head>
      <VacancyMatcher />
      <Link
        href="/#vacancy-match"
        style={{
          display: "block",
          textAlign: "center",
          color: "#166778",
          marginBottom: 40,
        }}
      >
        ← Home
      </Link>
    </>
  );
}
