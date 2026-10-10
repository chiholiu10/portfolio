import { VacancyMatcher } from "@/components/organisms/VacancyMatcher/VacancyMatcher";
import type { HomeSections } from "@/lib/content-model";
import HeadBlock from "@/components/atoms/PageHead/PageHead";
import { CareerAgent } from "@/components/organisms/CareerAgent/CareerAgent";
import { Contact } from "@/components/organisms/Contact/Contact";
import { Banner } from "@/components/organisms/Banner/Banner";
import { HowIWork } from "@/components/organisms/HowIWork/HowIWork";
import { Inspiration } from "@/components/organisms/Inspiration/Inspiration";
import { Footer } from "@/components/organisms/Footer/Footer";
import { Introduction } from "@/components/organisms/Introduction/Introduction";
import { Navbar } from "@/components/organisms/Navbar/Navbar";
import { Portfolio } from "@/components/organisms/Portfolio/Portfolio";
import { Tools } from "@/components/organisms/Tools/Tools";
import { createPortfolioProjects } from "@/lib/portfolio-projects";

export type HomeTemplateProps = {
  sections: HomeSections;
  isProduction: boolean;
};

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
      <Inspiration data={sections.inspiration} />
      <Portfolio data={sections.portfolio} />
      <VacancyMatcher data={sections.vacancyMatcher} />
      <Tools data={sections.tools} />
      <Contact data={sections.contact} />
      <Footer data={sections.footer} />
      {showCareerAgent && <CareerAgent portfolioProjects={portfolioProjects} />}
    </>
  );
}
