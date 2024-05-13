import Layout from "@/components/Layout";
import "@/styles/output.css";
import dynamic from "next/dynamic";

import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";

import createApolloClient from "@/apollo-client";

function App({ Component, pageProps }: AppProps) {
  const apolloClient = createApolloClient();

  return (
    <ApolloProvider client={apolloClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });
