import Head from "next/head";
import { AppCopyTitle, Navbar } from "components/molecules";

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
      </main>
    </div>
  );
}
