import * as React from "react";
import Head from "next/head";
import "../styles/theme-utils.css";
import "../styles/globals.scss";
import { Provider } from "react-redux";
import store from "../store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
let persistor = persistStore(store);

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        {getLayout(<Component {...pageProps} />)}
      </PersistGate>
    </Provider>
  );
}

// MyApp.propTypes = {
//   Component: PropTypes.elementType.isRequired,
//   emotionCache: PropTypes.object,
//   pageProps: PropTypes.object.isRequired,
// };
