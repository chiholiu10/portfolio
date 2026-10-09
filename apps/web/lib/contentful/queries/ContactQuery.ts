import { SECTION_FIELDS } from "@/lib/contentful/queries/SectionFields";

export const QUERY = `
  query sectionEntryQuery($id: String!) {
    section(id: $id) {
      ...SectionFields
    }
  }
  ${SECTION_FIELDS}
`;
