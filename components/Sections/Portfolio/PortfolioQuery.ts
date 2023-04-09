import { gql } from "@apollo/client";

export const QUERY = gql`
  query sectionEntryQuery {
    section(id: "2qFy05XNAe3Ho1CmJiAgbO") {
      sys {
        id
      }
      title
      subtitle
      array
    }
  }
`;
