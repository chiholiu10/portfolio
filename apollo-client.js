import { ApolloClient, InMemoryCache } from "@apollo/client";

const API_URL = (process && process.env.NODE_ENV === 'development') ? "http://localhost:1337" : 'https://portfolioserverside.herokuapp.com';

const client = new ApolloClient({
  uri: `${API_URL}/graphql`,
  cache: new InMemoryCache(),
});
console.log(client.uri);

export default client;