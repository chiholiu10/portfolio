import "../styles/global.css";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";

if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  import("react-devtools-core").then((ReactDevTools) => {
    ReactDevTools.connectToDevTools();
  });
}

const MyApp = ({ Component, pageProps }) => (
  <ApolloProvider client={client}>
    <Component {...pageProps} />
  </ApolloProvider>
);
export default MyApp;
