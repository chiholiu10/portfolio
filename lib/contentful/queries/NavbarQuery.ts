import { gql } from "@apollo/client";
import { SECTION_FIELDS } from "@/lib/contentful/queries/SectionFields";

export const QUERY = gql`
  query sectionEntryQuery($id: String!) {
    section(id: $id) {
      ...SectionFields
    }
  }
  ${SECTION_FIELDS}
`;
