export const QUERY = `
  query howIWorkSectionQuery($id: String!) {
    section(id: $id) {
      eyebrow
      title
      subtitle
      extraText
      arrays
    }
  }
`;
