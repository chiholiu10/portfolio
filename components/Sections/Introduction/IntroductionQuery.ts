import { gql } from "@apollo/client";

export const QUERY = gql`
  query sectionEntryQuery {
    section(id: "6tIxCNPyYeuCk4PHGcGtBH") {
      sys {
        id
      }
      title
      subtitle
      array
    }
  }
`;
