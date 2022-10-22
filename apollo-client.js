import { ApolloClient, InMemoryCache } from "@apollo/client";

const API_URL = process.env.NEXT_NODE_ENV === 'development' ? "http://localhost:1337" : process.env.NEXT_API_URL;

const client = new ApolloClient({
  uri: `${process.env.NEXT_API_URL}/graphql`,
  cache: new InMemoryCache(),
});

export default client;