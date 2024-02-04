import { ApolloProvider } from "@apollo/client";
import Head from 'next/head';
import client from "../apollo-client";
import "../styles/global.css";

const MyApp = ({ Component, pageProps }) => (
  <ApolloProvider client={client}>
    <Head>
      <title>Portfolio Chi Ho Liu | Front End Developer</title>
    </Head>
    <Component {...pageProps} />
  </ApolloProvider>
);
export default MyApp;
