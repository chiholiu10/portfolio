import { gql } from "@apollo/client";

export const QUERY = gql`
  query sectionEntryQuery {
    section(id: "Veijh9SFm3OqyuVxBBy17") {
      sys {
        id
      }
      subtitle
    }
  }
`;
