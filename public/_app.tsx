import { ChakraProvider } from "@chakra-ui/react";
import Footer from "components/Footer";
import Header from "components/Header";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "redux/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Provider store={store}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </Provider>
    </ChakraProvider>
  );
}
