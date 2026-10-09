import { gql } from "@apollo/client/core";

export const QUERY = gql`
  query howIWorkSectionQuery($id: String!) {
    section(id: $id) {
      eyebrow
      title
      subtitle
      extraText
      arrays
    }
  }
`;
