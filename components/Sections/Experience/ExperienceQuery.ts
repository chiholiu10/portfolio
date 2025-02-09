import { gql } from "@apollo/client";

export const QUERY = gql`
  query sectionEntryQuery($id: String!) {
    section(id: $id) {
      sys {
        id
      }
      subtitle
      image {
        url
      }
    }
  }
`;
