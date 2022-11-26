import { ArrowRightIcon, Button, Container } from "components/atoms";
import { AppCopyTitle, BottomBar, Navbar } from "components/molecules";
import {
  FinishBudgetButton,
  Cart,
  FinishBudgetProposal,
  Search,
} from "components/organisms";
import useUser from "lib/useUser";
import Head from "next/head";
import Link from "next/link";
import { Fragment } from "react";

export default function Home() {
  const { user } = useUser({ redirectTo: "/login" });

  return (
    <Fragment>
      <Head>
        <title>Papelei</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />
        <AppCopyTitle />
        {user?.onBoarded ? (
          <>
            <Cart />
            <Search />
          </>
        ) : (
          <Container>
            <article className="flex flex-col gap-10 py-12 items-start text-black-70">
              <div className="flex flex-col gap-2 ">
                <h3 className="text-base">Comece adicionando produtos</h3>
                <p className="text-base">
                  Assim que você tiver adicionado, o orçamento poderá ser criado
                  nesta página.
                </p>
              </div>

              <Link
                href={{ pathname: "/products", query: { addProduct: true } }}
              >
                <Button
                  icon={<ArrowRightIcon />}
                  iconToRight
                  backgroundColor="success"
                >
                  Adicionar agora
                </Button>
              </Link>
            </article>
          </Container>
        )}
        <FinishBudgetButton />
        <FinishBudgetProposal />
      </main>
      <BottomBar />
    </Fragment>
  );
}
