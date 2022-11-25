import { Button, Container } from "components/atoms";
import { useBudgetProposal } from "contexts/budgetProposal";
import { useCart } from "contexts/cart";
import { memo } from "react";

const FinishBudgetButton = () => {
  const { cartIsEmpty } = useCart();
  const { tryToFinishBudget } = useBudgetProposal();

  if (cartIsEmpty) return null;

  return (
    <Container className="fixed z-10 right-4 bottom-20 flex justify-start mx-auto left-0  pointer-events-none">
      <Button
        isRounded
        backgroundColor="success"
        onClick={tryToFinishBudget}
        testid="open-budget-modal-bottom"
        className="shadow-elevation-1 pointer-events-auto"
      >
        Fechar orçamento
      </Button>
    </Container>
  );
};

export default memo(FinishBudgetButton);
