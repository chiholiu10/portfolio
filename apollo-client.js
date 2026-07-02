import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client/core";
import { HttpLink } from "@apollo/client/link/http";
import { SetContextLink } from "@apollo/client/link/context";

const contentToken = "gfeeYIbSBOGqpbHI_nLebjUylA3vOJaaPY23jNL6avA";

const httpLink = new HttpLink({
  uri: "https://graphql.contentful.com/content/v1/spaces/z1tccslo5ojo/environments/master",
});

const authLink = new SetContextLink((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: `Bearer ${contentToken}`,
  },
}));

const introspectionBlockLink = new ApolloLink((operation, forward) => {
  if (
    process.env.NODE_ENV === "production" &&
    operation.query.definitions.some(
      (def) =>
        def.kind === "OperationDefinition" &&
        def.selectionSet.selections.some(
          (selection) =>
            selection.name?.value === "__schema" ||
            selection.name?.value === "__type",
        ),
    )
  ) {
    return null;
  }
  return forward(operation);
});

export const createApolloClient = (initialState) => {
  const cache = new InMemoryCache();

  if (initialState) cache.restore(initialState);

  return new ApolloClient({
    link: ApolloLink.from([authLink, introspectionBlockLink, httpLink]),
    cache,
    ssrMode: typeof window === "undefined",
  });
};

const client = createApolloClient();

export default client;
