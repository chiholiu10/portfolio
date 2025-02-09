import { gql } from "@apollo/client";

export const QUERY = gql`
  query sectionEntryQuery($id: String!) {
    section(id: $id) {
      title
      subtitle
      arrayBlockCollection {
        items {
          title
          url
        }
      }
    }
  }
`;
