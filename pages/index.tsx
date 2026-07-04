import { ThemeProvider } from "styled-components";
import { CSSreset } from "../styles/CssReset";
import theme from "../styles/Theme";
import { createApolloClient } from "../apollo-client";
import { Contact } from "../components/Contact/Contact";
import { Banner } from "../components/Sections/Banner/Banner";
import { Experience } from "../components/Sections/Experience/Experience";
import { Footer } from "../components/Sections/Footer/Footer";
import { Introduction } from "../components/Sections/Introduction/Introduction";
import { Navbar } from "../components/Sections/Navbar/Navbar";
import { Portfolio } from "../components/Sections/Portfolio/Portfolio";
import { Tools } from "../components/Sections/Tools/Tools";
import { QUERY as NAVBAR_QUERY } from "../components/Sections/Navbar/NavbarQuery";
import { QUERY as BANNER_QUERY } from "../components/Sections/Banner/BannerQuery";
import { QUERY as INTRODUCTION_QUERY } from "../components/Sections/Introduction/IntroductionQuery";
import { QUERY as EXPERIENCE_QUERY } from "../components/Sections/Experience/ExperienceQuery";
import { QUERY as PORTFOLIO_QUERY } from "../components/Sections/Portfolio/PortfolioQuery";
import { QUERY as TOOLS_QUERY } from "../components/Sections/Tools/ToolsQuery";
import { QUERY as CONTACT_QUERY } from "../components/Contact/ContactQuery";
import { QUERY as FOOTER_QUERY } from "../components/Sections/Footer/FooterQuery";

export default function ClientSide({ sections }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CSSreset theme={theme} />
        <Navbar data={sections.navbar} />
        <Banner data={sections.banner} />
        <Introduction data={sections.introduction} />
        <Experience data={sections.experience} />
        <Portfolio data={sections.portfolio} />
        <Tools data={sections.tools} />
        <Contact data={sections.contact} />
        <Footer data={sections.footer} />
      </ThemeProvider>
    </>
  );
}

const contentQueries = [
  [NAVBAR_QUERY, "1fU09M2HwR6lvRsgaT26YK"],
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

  const [
    navbar,
    banner,
    introduction,
    experience,
    portfolio,
    tools,
    contact,
    footer,
  ] = results.map(({ data }) => data);

  return {
    props: {
      sections: {
        navbar,
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
