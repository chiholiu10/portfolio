export const QUERY = `
  query sectionEntryQuery($id: String!) {
    section(id: $id) {
      approachEyebrow
      eyebrow
      title
      subtitle
      arrays
      extraText
    }
  }
`;
