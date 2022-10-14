import { AppCopyTitle, BottomBar, Navbar } from "components/molecules";
import {
  FinishBudgetButton,
  Cart,
  FinishBudgetProposal,
  Search,
} from "components/organisms";
import useUser from "lib/useUser";
import Head from "next/head";
import { Fragment } from "react";

export default function Home() {
  // useUser({ redirectTo: "/login" });

  return (
    <Fragment>
      <Head>
        <title>Papelei</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />
        <AppCopyTitle />
        <Cart />
        <Search />
        <FinishBudgetButton />
        <FinishBudgetProposal />
      </main>
      <BottomBar />
    </Fragment>
  );
}
