import { gql } from "@apollo/client";
import { SUBTITLE } from "../../../graphql/fragments";

export const QUERY = gql`
  query sectionEntryQuery($id: String!) {
    section(id: $id) {
      ...Subtitle
    }
    ${SUBTITLE}
  }
`;
