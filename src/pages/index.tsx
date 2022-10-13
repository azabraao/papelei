import { AppCopyTitle, Navbar } from "components/molecules";
import {
  BudgetProposalSummary,
  Cart,
  FinishBudgetProposal,
  Search,
} from "components/organisms";
import useUser from "lib/useUser";
import Head from "next/head";

export default function Home() {
  useUser({ redirectTo: "/login" });

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
