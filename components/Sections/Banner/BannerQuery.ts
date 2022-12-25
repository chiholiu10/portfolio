import { gql } from "@apollo/client";

export const QUERY = gql`
  query sectionEntryQuery {
    section(id: "7wNcHAAqxL2cunkRCCxW4o") {
      sys {
        id
      }
      title
      subtitle
      array
    }
  }
`;
