import { Button, Container } from "components/atoms";
import { useCart } from "contexts/cart";
import { useBudgetProposal } from "contexts/budgetProposal";
import { memo } from "react";
import { numberToMoney } from "utils";

const BudgetProposalSummary = () => {
  const { cartIsEmpty, cartTotal } = useCart();
  const { openBudgetProposal } = useBudgetProposal();

  if (cartIsEmpty) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-elevation-1">
      <Container>
        <div className="flex justify-between items-center">
          <div className="pt-4 pb-4 pr-4 ">
            <article>
              <p className="text-sm text-black-70">Total</p>
              <p
                data-testid="budget-total-value"
                className="text-base text-black-70 font-bold"
              >
                {numberToMoney(cartTotal)}
              </p>
            </article>
          </div>

          <div className="pt-4 pb-4 pl-4">
            <Button
              label="Fechar orçamento"
              backgroundColor="success"
              onClick={openBudgetProposal}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default memo(BudgetProposalSummary);
