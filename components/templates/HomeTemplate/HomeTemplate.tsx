import type { HomeSections } from "../../../lib/content-model";
import HeadBlock from "../../atoms/PageHead/PageHead";
import { CareerAgent } from "../../organisms/CareerAgent/CareerAgent";
import { Contact } from "../../organisms/Contact/Contact";
import { Banner } from "../../organisms/Banner/Banner";
import { HowIWork } from "../../organisms/HowIWork/HowIWork";
import { Experience } from "../../organisms/Experience/Experience";
import { Footer } from "../../organisms/Footer/Footer";
import { Introduction } from "../../organisms/Introduction/Introduction";
import { Navbar } from "../../organisms/Navbar/Navbar";
import { Portfolio } from "../../organisms/Portfolio/Portfolio";
import { Tools } from "../../organisms/Tools/Tools";
import { createPortfolioProjects } from "../../../lib/portfolio-projects";

export type HomeTemplateProps = { sections: HomeSections; isProduction: boolean };

export function HomeTemplate({ sections, isProduction }: HomeTemplateProps) {
  const contactSection = sections.contact?.section;
  const showCareerAgent = isProduction
    ? contactSection?.showCareerAgentInProduction === true
    : contactSection?.showCareerAgentInLocalhost === true;
  const portfolioProjects = createPortfolioProjects(
    sections.portfolio?.section?.array || [],
    sections.portfolio?.section?.arrays || { projects: [] },
  );

  return (
    <>
      <HeadBlock />
      <Navbar data={sections.navbar} />
      <Banner data={sections.banner} />
      <Introduction data={sections.introduction} />
      <HowIWork data={sections.howIWork} />
      <Experience data={sections.experience} />
      <Portfolio data={sections.portfolio} />
      <Tools data={sections.tools} />
      <Contact data={sections.contact} showForm={!isProduction} />
      <Footer data={sections.footer} />
      {showCareerAgent && (
        <CareerAgent portfolioProjects={portfolioProjects} />
      )}
    </>
  );
}
