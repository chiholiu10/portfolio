export const QUERY = `
  query sectionEntryQuery($id: String!) {
    section(id: $id) {
      subtitle
    }
  }
`;
