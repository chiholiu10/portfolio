import { gql } from "@apollo/client";

export const QUERY = gql`
  query sectionEntryQuery {
    section(id: "2c3zCPqbJcXzcaM2bYTp52") {
      sys {
        id
      }
      subtitle,
      image {
        url
      }
    }
  }
`;