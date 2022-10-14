import { Button } from "components/atoms";
import { useBudgetProposal } from "contexts/budgetProposal";
import { useCart } from "contexts/cart";
import { memo } from "react";

const FinishBudgetButton = () => {
  const { cartIsEmpty } = useCart();
  const { tryToFinishBudget } = useBudgetProposal();

  if (cartIsEmpty) return null;

  return (
    <div className="fixed bottom-20 left-4">
      <Button
        isRounded
        backgroundColor="success"
        onClick={tryToFinishBudget}
        testid="open-budget-modal-bottom"
        className="shadow-elevation-1"
      >
        Fechar orçamento
      </Button>
    </div>
  );
};

export default memo(FinishBudgetButton);
