import { gql } from "@apollo/client";

export const QUERY = gql`
  query sectionEntryQuery($id: String!) {
    section(id: $id) {
      eyebrow
      title
      subtitle
      extraText
      arrays
      arrayBlockCollection {
        items {
          title
          url
        }
      }
    }
  }
`;
