import { ArrowLeftIcon, Button } from "components/atoms";
import fetchJson from "lib/fetchJson";
import useUser from "lib/useUser";
import { useRouter } from "next/router";
import { memo } from "react";

const LogoutButton = () => {
  const { mutateUser } = useUser();
  const router = useRouter();

  const onButtonClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    mutateUser(await fetchJson("/api/logout", { method: "POST" }), false);
    router.push("/login");
  };

  return (
    <Button
      onClick={onButtonClick}
      backgroundColor="danger"
      icon={<ArrowLeftIcon />}
    >
      Sair
    </Button>
  );
};

export default memo(LogoutButton);
