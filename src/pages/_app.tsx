import { AppProps } from "next/app";
import Head from "next/head";

import "@/styles/global.scss";

export default ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Component {...pageProps} />
  </>
);
