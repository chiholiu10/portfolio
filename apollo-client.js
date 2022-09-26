import { ApolloClient, InMemoryCache } from "@apollo/client";

const API_URL = process.env.NODE_ENV === 'production' ? process.env.NEXT_API_URL : "http://localhost:1337";
console.log(API_URL);
const client = new ApolloClient({
  uri: `${API_URL}/graphql`,
  cache: new InMemoryCache(),
});

export default client;