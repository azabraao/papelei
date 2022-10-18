import { Container, PageHeader } from "components/atoms";
import { BottomBar, LogoUploader, Navbar } from "components/molecules";
import LogoutButton from "components/molecules/LogoutButton";
import useUser from "lib/useUser";
import Head from "next/head";
import { Fragment } from "react";

export default function Profile() {
  useUser({ redirectTo: "/login" });

  return (
    <Fragment>
      <Head>
        <title>Papelei | Perfil</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />
        <PageHeader>Seu negócio</PageHeader>

        <Container className="py-11">
          <LogoUploader />
        </Container>

        <Container className="pt-11">
          <LogoutButton />
        </Container>
      </main>
      <BottomBar />
    </Fragment>
  );
}
