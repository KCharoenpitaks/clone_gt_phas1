import "../styles/globals.less";
import "../styles/antd.less";
import "react-loading-skeleton/dist/skeleton.css";
import type { AppProps } from "next/app";
import { MoralisProvider } from "react-moralis";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider
      serverUrl="https://qgscra3rkvgd.usemoralis.com:2053/server"
      appId="nHAkTap2BJJ7hicOoRlOtR3KgXPBFxFnXAb90tji"
    >
      <Component {...pageProps} />
    </MoralisProvider>
  );
}

export default MyApp;
