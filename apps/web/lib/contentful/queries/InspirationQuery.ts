export const QUERY = `
  query sectionEntryQuery($id: String!) {
    section(id: $id) {
      eyebrow
      title
      subtitle
      image {
        url
      }
    }
  }
`;
