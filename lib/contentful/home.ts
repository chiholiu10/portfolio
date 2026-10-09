import { createApolloClient } from "@/lib/contentful/client";
import { HomeSections, parseHomeSection } from "@/lib/content-model";
import { QUERY as navbar } from "@/lib/contentful/queries/NavbarQuery";
import { QUERY as banner } from "@/lib/contentful/queries/BannerQuery";
import { QUERY as introduction } from "@/lib/contentful/queries/IntroductionQuery";
import { QUERY as experience } from "@/lib/contentful/queries/ExperienceQuery";
import { QUERY as portfolio } from "@/lib/contentful/queries/PortfolioQuery";
import { QUERY as tools } from "@/lib/contentful/queries/ToolsQuery";
import { QUERY as contact } from "@/lib/contentful/queries/ContactQuery";
import { QUERY as footer } from "@/lib/contentful/queries/FooterQuery";
import { QUERY as howIWork } from "@/lib/contentful/queries/HowIWorkQuery";
import { sectionIds } from "@/lib/contentful/section-ids";

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
