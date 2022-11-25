import { gql } from "@apollo/client";

export const QUERY = gql`
  query sectionEntryQuery {
    section(id: "6pPYUtgRlvgICxNf4Dhei") {
      sys {
        id
      }
      title
      arrays
    }
  }
`;
