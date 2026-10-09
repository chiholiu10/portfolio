import { createApolloClient } from "@/lib/contentful/client";
import { QUERY } from "@/lib/contentful/queries/PortfolioQuery";
import { sectionIds } from "@/lib/contentful/section-ids";
import { parseHomeSection } from "@/lib/content-model";

export const loadPortfolioSection = async () => {
  const { data } = await createApolloClient().query<unknown>({ query: QUERY, variables: { id: sectionIds.portfolio } });
  const { section } = parseHomeSection("portfolio", data);
  if (!section) {
    throw new Error("Portfolio content is missing in Contentful");
  }
  return section;
};
