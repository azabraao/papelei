import { BottomBar, Navbar } from "components/molecules";
// import { CRUDProducts } from "components/organisms";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const CRUDProducts = dynamic(
  () => import("../components/organisms/CRUDProducts"),
  { ssr: false }
);

// import useUser from "lib/useUser";
import Head from "next/head";
import { Fragment } from "react";
import { PageHeader } from "components/atoms";
import LoadingState from "components/organisms/CRUDProducts/components/LoadingState";

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
        <Suspense
          fallback={
            <>
              <PageHeader>Produtos</PageHeader>
              <LoadingState />
            </>
          }
        >
          <CRUDProducts />
        </Suspense>
      </main>
      <BottomBar />
    </Fragment>
  );
}
