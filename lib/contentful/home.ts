import { createApolloClient } from "./client";
import { HomeSections, parseHomeSection } from "../content-model";
import { QUERY as navbar } from "./queries/NavbarQuery";
import { QUERY as banner } from "./queries/BannerQuery";
import { QUERY as introduction } from "./queries/IntroductionQuery";
import { QUERY as experience } from "./queries/ExperienceQuery";
import { QUERY as portfolio } from "./queries/PortfolioQuery";
import { QUERY as tools } from "./queries/ToolsQuery";
import { QUERY as contact } from "./queries/ContactQuery";
import { QUERY as footer } from "./queries/FooterQuery";
import { QUERY as howIWork } from "./queries/HowIWorkQuery";
import { sectionIds } from "./section-ids";

const queries = { navbar, banner, introduction, howIWork, experience, portfolio, tools, contact, footer };

export const loadHomeSections = async (): Promise<HomeSections> => {
  const client = createApolloClient();
  const entries = await Promise.all(
    (Object.keys(queries) as Array<keyof HomeSections>).map(async (name) => {
      const { data } = await client.query<unknown>({
        query: queries[name], variables: { id: sectionIds[name] },
      });
      return [name, parseHomeSection(name, data)] as const;
    }),
  );
  return Object.fromEntries(entries) as HomeSections;
};
