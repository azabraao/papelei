import { Button } from "components/atoms";
import { memo } from "react";

const SubmitButton = () => {
  return (
    <Button
      type="submit"
      fullWidth
      backgroundColor="info"
      testid="budget-modal-bottom-submit-button"
    >
      Criar orçamento
    </Button>
  );
};

export default memo(SubmitButton);
