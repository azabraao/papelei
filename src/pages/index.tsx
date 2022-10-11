import Head from "next/head";
import { AppCopyTitle, Navbar } from "components/molecules";
import {
  BudgetProposalSummary,
  Cart,
  FinishBudgetProposal,
  Search,
} from "components/organisms";
import dynamic from "next/dynamic";
import Script from "next/script";

const GoogleButton = dynamic(
  () => import("../components/molecules/GoogleButton"),
  {
    ssr: false,
  }
);

const FacebookButton = dynamic(
  () => import("../components/molecules/FacebookButton"),
  {
    ssr: false,
  }
);

export default function Home() {
  return (
    <div>
      <Head>
        <title>AMD Gesso | Criar orçamento</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <GoogleButton />
        <FacebookButton />
        <Navbar />
        <AppCopyTitle />
        <Cart />
        <Search />
        <BudgetProposalSummary />
        <FinishBudgetProposal />
      </main>
    </div>
  );
}
