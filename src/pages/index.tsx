import Head from "next/head";
import { AppCopyTitle, Navbar } from "components/molecules";
import { Search } from "components/organisms";

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
        <Search />
      </main>
    </div>
  );
}
