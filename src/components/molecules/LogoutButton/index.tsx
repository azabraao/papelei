import { ArrowLeftIcon, Button } from "components/atoms";
import { memo } from "react";

const LogoutButton = () => {
  return (
    <Button backgroundColor="danger" icon={<ArrowLeftIcon />}>
      Sair
    </Button>
  );
};

export default memo(LogoutButton);
