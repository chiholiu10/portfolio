import { createApolloClient } from "./client";
import { QUERY } from "./queries/PortfolioQuery";
import { sectionIds } from "./section-ids";
import { parseHomeSection } from "../content-model";

export const loadPortfolioSection = async () => {
  const { data } = await createApolloClient().query<unknown>({ query: QUERY, variables: { id: sectionIds.portfolio } });
  const { section } = parseHomeSection("portfolio", data);
  if (!section) {
    throw new Error("Portfolio content is missing in Contentful");
  }
  return section;
};
