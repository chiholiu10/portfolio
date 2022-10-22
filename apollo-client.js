import { ApolloClient, InMemoryCache } from "@apollo/client";

const API_URL = (process && process.env.NODE_ENV === 'development') ? "http://localhost:1337/graphql" : 'https://portfolioserverside.herokuapp.com/graphql';
console.log(process.env.NODE_ENV === 'development');
console.log(process.env.NODE_ENV === 'production');
const client = new ApolloClient({
  uri: `${API_URL}`,
  cache: new InMemoryCache(),
});

export default client;