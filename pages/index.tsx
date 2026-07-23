import { ThemeProvider } from "styled-components";
import { CareerAgent } from "../components/CareerAgent/CareerAgent";
import { CSSreset } from "../styles/CssReset";
import theme from "../styles/Theme";
import { Contact } from "../components/Contact/Contact";
import { Banner } from "../components/Sections/Banner/Banner";
import { Experience } from "../components/Sections/Experience/Experience";
import { Footer } from "../components/Sections/Footer/Footer";
import { Introduction } from "../components/Sections/Introduction/Introduction";
import { Navbar } from "../components/Sections/Navbar/Navbar";
import { Portfolio } from "../components/Sections/Portfolio/Portfolio";
import { Tools } from "../components/Sections/Tools/Tools";

export default function ClientSide({ sections, isProduction }) {
  const contactSection = sections.contact?.section;
  const showCareerAgent = isProduction
    ? contactSection?.showCareerAgentInProduction === true
    : contactSection?.showCareerAgentInLocalhost === true;

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
        {showCareerAgent && <CareerAgent />}
      </ThemeProvider>
    </>
  );
}

export async function getStaticProps() {
  const { createApolloClient } = await import("../apollo-client");
  const { QUERY: NAVBAR_QUERY } = await import(
    "../components/Sections/Navbar/NavbarQuery"
  );
  const { QUERY: BANNER_QUERY } = await import(
    "../components/Sections/Banner/BannerQuery"
  );
  const { QUERY: INTRODUCTION_QUERY } = await import(
    "../components/Sections/Introduction/IntroductionQuery"
  );
  const { QUERY: EXPERIENCE_QUERY } = await import(
    "../components/Sections/Experience/ExperienceQuery"
  );
  const { QUERY: PORTFOLIO_QUERY } = await import(
    "../components/Sections/Portfolio/PortfolioQuery"
  );
  const { QUERY: TOOLS_QUERY } = await import(
    "../components/Sections/Tools/ToolsQuery"
  );
  const { QUERY: CONTACT_QUERY } = await import(
    "../components/Contact/ContactQuery"
  );
  const { QUERY: FOOTER_QUERY } = await import(
    "../components/Sections/Footer/FooterQuery"
  );

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
      isProduction: process.env.NODE_ENV === "production",
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
