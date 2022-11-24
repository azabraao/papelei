import { BottomBar, Navbar } from "components/molecules";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const CRUDProducts = dynamic(
  () => import("../components/organisms/CRUDProducts"),
  { ssr: false }
);

import { PageHeader } from "components/atoms";
import LoadingState from "components/organisms/CRUDProducts/components/LoadingState";
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
        <Suspense
          fallback={
            <>
              <PageHeader>Produtos</PageHeader>
              <LoadingState />
            </>
          }
        ></Suspense>
        <CRUDProducts />
      </main>
      <BottomBar />
    </Fragment>
  );
}
