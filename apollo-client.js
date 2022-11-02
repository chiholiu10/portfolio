import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const contentToken = 'Efc8fVC1vz-dSug8XJUneKcS-LXCpE_pNtr0a6_JfFA';

const httpLink = createHttpLink({
  uri: `https://graphql.contentful.com/content/v1/spaces/z1tccslo5ojo/environments/master`,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${contentToken}`,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;