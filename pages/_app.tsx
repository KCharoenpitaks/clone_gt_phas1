import "../styles/globals.less";
import "../styles/antd.less";
import "react-loading-skeleton/dist/skeleton.css";
import type { AppProps } from "next/app";
import { MoralisProvider } from "react-moralis";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider
      serverUrl="https://yp9v1zktox9g.usemoralis.com:2053/server"
      appId="UqiOmRO5mtuqqpaFfekoqHZe4FSizkJniQwS1Dvt"
    >
      <Head>
        <meta name="viewport" content="viewport-fit=cover" />
      </Head>
      <Component {...pageProps} />
    </MoralisProvider>
  );
}

export default MyApp;
