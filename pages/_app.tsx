import "../styles/globals.less";
import "../styles/antd.less";
import "react-loading-skeleton/dist/skeleton.css";
import type { AppProps } from "next/app";
import { MoralisProvider } from "react-moralis";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider
      serverUrl="https://yp9v1zktox9g.usemoralis.com:2053/server"
      appId="UqiOmRO5mtuqqpaFfekoqHZe4FSizkJniQwS1Dvt"
    >
      <Component {...pageProps} />
    </MoralisProvider>
  );
}

export default MyApp;
