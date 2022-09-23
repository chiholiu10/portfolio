import { ApolloClient, InMemoryCache } from "@apollo/client";

const API_URL = process.env.STRAPI_PRODUCTION || "http://localhost:1337";

const client = new ApolloClient({
  uri: `${API_URL}/graphql`,
  cache: new InMemoryCache(),
});

export default client;