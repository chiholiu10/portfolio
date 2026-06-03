import {
  ApolloClient,
  createHttpLink,
  ApolloLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const contentToken = "gfeeYIbSBOGqpbHI_nLebjUylA3vOJaaPY23jNL6avA";

const httpLink = createHttpLink({
  uri: "https://graphql.contentful.com/content/v1/spaces/z1tccslo5ojo/environments/master",
});

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: `Bearer ${contentToken}`,
  },
}));

const introspectionBlockLink = new ApolloLink((operation, forward) => {
  if (
    process.env.NODE_ENV === "production"
    && operation.query.definitions.some(
      (def) =>
        def.kind === "OperationDefinition"
        && def.selectionSet.selections.some(
          (selection) =>
            selection.name?.value === "__schema"
            || selection.name?.value === "__type",
        ),
    )
  ) {
    return null; // Block the request
  }
  return forward(operation);
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, introspectionBlockLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
