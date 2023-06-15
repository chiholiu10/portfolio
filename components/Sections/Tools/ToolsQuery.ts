import { gql } from "@apollo/client";

export const QUERY = gql`
  query sectionEntryQuery {
    section(id: "2FzwztBT4JTZm5icaV1tlb") {
      sys {
        id
      }
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
