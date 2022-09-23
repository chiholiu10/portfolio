const COMPONENTS_QUERY = gql`
  query GetComponents {
    component(id: 1) {
      data {
        id,
        attributes {
          component {
            id,
            title,
            subtitle,
            context,
            content {
              title,
              subtitle,
              image
            }
          }
        }
      }
    }
  }
`;

export default COMPONENTS_QUERY;