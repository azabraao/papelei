import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html className="min-h-screen">
      <Head >

      <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon.png"></link>
          <meta name="theme-color" content="#FD777C" />

      </Head>
      <body className="bg-blue-50 min-h-screen">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
