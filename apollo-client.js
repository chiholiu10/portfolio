import { ApolloClient, InMemoryCache } from "@apollo/client";

const API_URL = (process && process.env.NODE_ENV === 'production') ? "https://portfolioserverside.herokuapp.com" : "http://localhost:1337/graphql";
const client = new ApolloClient({
  uri: `${API_URL}`,
  cache: new InMemoryCache(),
});

export default client;