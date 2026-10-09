export const QUERY = `
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
