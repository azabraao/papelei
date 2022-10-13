import fetchJson from "lib/fetchJson";
import useUser from "lib/useUser";
import { useRouter } from "next/router";
import { memo } from "react";

const LogoutLink = () => {
  const { user, mutateUser } = useUser({ redirectTo: "/login" });
  const router = useRouter();

  return (
    <a
      href="/api/logout"
      onClick={async (e) => {
        e.preventDefault();
        mutateUser(await fetchJson("/api/logout", { method: "POST" }), false);
        router.push("/login");
      }}
    >
      Logout
    </a>
  );
};

export default memo(LogoutLink);
