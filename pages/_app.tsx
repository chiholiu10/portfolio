import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import "../styles/global.css";

const MyApp = ({ Component, pageProps }) => (
  <ApolloProvider client={client}>
    <Component {...pageProps} />
  </ApolloProvider>
);
export default MyApp;
