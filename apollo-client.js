import {
  ApolloClient,
  createHttpLink,
  ApolloLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const contentToken = "Efc8fVC1vz-dSug8XJUneKcS-LXCpE_pNtr0a6_JfFA";

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
      (def) => def.kind === "OperationDefinition"
        && def.selectionSet.selections.some(
          (selection) => selection.name?.value === "__schema"
            || selection.name?.value === "__type",
        ),
    )
  ) {
    console.warn("Introspection is disabled in production.");
    return null; // Block the request
  }
  return forward(operation);
});

console.log(introspectionBlockLink);

const client = new ApolloClient({
  link: ApolloLink.from([authLink, introspectionBlockLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
