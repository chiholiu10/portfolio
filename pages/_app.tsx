import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import reducer from "../reducers/reducer";

const store = configureStore({ reducer: reducer });

const MyApp = ({ Component, pageProps }) => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  </ApolloProvider>
);
export default MyApp;