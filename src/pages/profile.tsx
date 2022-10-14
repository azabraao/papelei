import { Container, PageHeader } from "components/atoms";
import { BottomBar, Navbar } from "components/molecules";
import Head from "next/head";
import { Fragment } from "react";

export default function Profile() {
  // useUser({ redirectTo: "/login" });

  return (
    <Fragment>
      <Head>
        <title>Papelei | Perfil</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />
        <PageHeader>Seu negócio</PageHeader>
      </main>
      <BottomBar />
    </Fragment>
  );
}
