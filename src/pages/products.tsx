import { BottomBar, Navbar } from "components/molecules";
import dynamic from "next/dynamic";

const CRUDProducts = dynamic(
  () => import("../components/organisms/CRUDProducts"),
  { ssr: false }
);

import Head from "next/head";
import { Fragment } from "react";
import useUser from "lib/useUser";

export default function Config() {
  useUser({ redirectTo: "/login" });

  return (
    <Fragment>
      <Head>
        <title>Papelei | Configurações</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />
        <CRUDProducts />
      </main>
      <BottomBar />
    </Fragment>
  );
}
