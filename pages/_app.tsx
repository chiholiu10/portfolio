import "../styles/global.css";
import Head from "next/head";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";

if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  import("react-devtools-core").then((ReactDevTools) => {
    ReactDevTools.connectToDevTools();
  });
}

const MyApp = ({ Component, pageProps }) => (
  <ApolloProvider client={client}>
    <Head>
      <title>Portfolio Chi Ho Liu | Front End Developer</title>
    </Head>
    <Component {...pageProps} />
  </ApolloProvider>
);
export default MyApp;
