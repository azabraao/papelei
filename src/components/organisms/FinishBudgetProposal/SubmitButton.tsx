import { Button } from "components/atoms";
import { memo } from "react";

const SubmitButton = () => {
  return (
    <Button type="submit" fullWidth backgroundColor="info">
      Criar orçamento
    </Button>
  );
};

export default memo(SubmitButton);
