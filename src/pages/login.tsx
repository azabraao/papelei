import { Container } from "components/atoms";
import { FacebookButton, GoogleButton } from "components/molecules";
import fetchJson from "lib/fetchJson";
import useUser from "lib/useUser";
import Head from "next/head";
import { Fragment } from "react";

export default function Auth() {
  const { mutateUser } = useUser({
    redirectTo: "/",
    redirectIfFound: true,
  });

  const handleLogin = async (user: User) => {
    return await mutateUser(
      await fetchJson("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      })
    );
  };

  return (
    <Fragment>
      <Head>
        <title>AMD Gesso | Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <div className="py-10 flex flex-col gap-36 justify-end min-h-screen">
          <div className="flex flex-col gap-2 text-gray-700">
            <h1 className=" text-3xl font-bold">Faça login</h1>
            <p className="text-lg ">Pra começar a vender!</p>
          </div>

          <main className="flex flex-col gap-4">
            <GoogleButton handleLogin={handleLogin} />
            <FacebookButton handleLogin={handleLogin} />
          </main>
        </div>
      </Container>
    </Fragment>
  );
}
