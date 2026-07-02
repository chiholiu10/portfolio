import dynamic from "next/dynamic";
import { ThemeProvider } from "styled-components";
import { CSSreset } from "../styles/CssReset";
import theme from "../styles/Theme";
import { createApolloClient } from "../apollo-client";
import { QUERY as BANNER_QUERY } from "../components/Sections/Banner/BannerQuery";
import { QUERY as INTRODUCTION_QUERY } from "../components/Sections/Introduction/IntroductionQuery";
import { QUERY as EXPERIENCE_QUERY } from "../components/Sections/Experience/ExperienceQuery";
import { QUERY as PORTFOLIO_QUERY } from "../components/Sections/Portfolio/PortfolioQuery";
import { QUERY as TOOLS_QUERY } from "../components/Sections/Tools/ToolsQuery";
import { QUERY as CONTACT_QUERY } from "../components/Contact/ContactQuery";
import { QUERY as FOOTER_QUERY } from "../components/Sections/Footer/FooterQuery";

const DynamicNavbar = dynamic(() =>
  import("../components/Sections/Navbar/Navbar").then((mod) => mod.Navbar),
);
const DynamicBanner = dynamic(() =>
  import("../components/Sections/Banner/Banner").then((mod) => mod.Banner),
);
const DynamicIntroduction = dynamic(() =>
  import("../components/Sections/Introduction/Introduction").then(
    (mod) => mod.Introduction,
  ),
);
const DynamicExperience = dynamic(() =>
  import("../components/Sections/Experience/Experience").then(
    (mod) => mod.Experience,
  ),
);
const DynamicPortfolio = dynamic(() =>
  import("../components/Sections/Portfolio/Portfolio").then(
    (mod) => mod.Portfolio,
  ),
);
const DynamicContact = dynamic(() =>
  import("../components/Contact/Contact").then((mod) => mod.Contact),
);
const DynamicTools = dynamic(() =>
  import("../components/Sections/Tools/Tools").then((mod) => mod.Tools),
);
const DynamicFooter = dynamic(() =>
  import("../components/Sections/Footer/Footer").then((mod) => mod.Footer),
);

export default function ClientSide({ sections }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CSSreset theme={theme} />
        <DynamicNavbar />
        <DynamicBanner data={sections.banner} />
        <DynamicIntroduction data={sections.introduction} />
        <DynamicExperience data={sections.experience} />
        <DynamicPortfolio data={sections.portfolio} />
        <DynamicTools data={sections.tools} />
        <DynamicContact data={sections.contact} />
        <DynamicFooter data={sections.footer} />
      </ThemeProvider>
    </>
  );
}

const contentQueries = [
  [BANNER_QUERY, "7wNcHAAqxL2cunkRCCxW4o"],
  [INTRODUCTION_QUERY, "4DIoyNagIFWzKfhGrtKUXB"],
  [EXPERIENCE_QUERY, "2c3zCPqbJcXzcaM2bYTp52"],
  [PORTFOLIO_QUERY, "2qFy05XNAe3Ho1CmJiAgbO"],
  [TOOLS_QUERY, "2FzwztBT4JTZm5icaV1tlb"],
  [CONTACT_QUERY, "6pPYUtgRlvgICxNf4Dhei"],
  [FOOTER_QUERY, "Veijh9SFm3OqyuVxBBy17"],
] as const;

export async function getStaticProps() {
  const client = createApolloClient();

  const results = await Promise.all(
    contentQueries.map(([query, id]) =>
      client.query({ query, variables: { id } }),
    ),
  );

  const [banner, introduction, experience, portfolio, tools, contact, footer] =
    results.map(({ data }) => data);

  return {
    props: {
      sections: {
        banner,
        introduction,
        experience,
        portfolio,
        tools,
        contact,
        footer,
      },
    },
    revalidate: 3600,
  };
}
