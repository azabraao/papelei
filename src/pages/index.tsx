import Head from "next/head";
import { AppCopyTitle, Navbar } from "components/molecules";
import {
  BudgetProposalSummary,
  Cart,
  FinishBudgetProposal,
  Search,
} from "components/organisms";

export default function Home() {
  return (
    <div>
      <Head>
        <title>AMD Gesso | Criar orçamento</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
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
