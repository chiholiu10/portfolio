import { gql } from "@apollo/client";

export const QUERY = gql`
  query howIWorkSectionQuery($id: String!) {
    section(id: $id) {
      title
      subtitle
      extraText
      arrays
    }
  }
`;
