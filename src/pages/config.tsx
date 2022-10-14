import { PageHeader } from "components/atoms";
import { BottomBar, Navbar } from "components/molecules";
import Head from "next/head";
import { Fragment } from "react";

export default function Config() {
  // useUser({ redirectTo: "/login" });

  return (
    <Fragment>
      <Head>
        <title>Papelei | Configurações</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />
        <PageHeader>Produtos</PageHeader>
      </main>
      <BottomBar />
    </Fragment>
  );
}
