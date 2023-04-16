import { gql } from "@apollo/client";

export const QUERY = gql`
  query sectionEntryQuery {
    section(id: "4DIoyNagIFWzKfhGrtKUXB") {
      sys {
        id
      }
      # add the fields you want to query
      title
      subtitle
      arrays
    }
  }
`;
