import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html className="min-h-screen">
      <Head />
      <body className="bg-danger-lighter min-h-screen">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
