import { Button, ModalBottom } from "components/atoms";
import { TextArea, TextInput } from "components/molecules";
import { useBudgetProposal } from "contexts/budgetProposal";
import { useCart } from "contexts/cart";
import { memo } from "react";
import { numberToMoney } from "utils";

const FinishBudgetProposal = () => {
  const { isEditing, closeBudgetProposal } = useBudgetProposal();
  const { cartTotal } = useCart();

  return (
    <ModalBottom isOpen={isEditing} closeModalBottom={closeBudgetProposal}>
      <div className="flex flex-col gap-4 pb-6">
        <div className="flex justify-between items-center">
          <span className="text-lg text-black-70">Fechar orçamento</span>
          <span className="text-lg text-black-70">
            {numberToMoney(cartTotal)}
          </span>
        </div>

        <TextInput label="Nome do cliente" placeholder="João Fulano" />
        <TextInput label="Endereço" placeholder="Rua das Flores, nº 0" />
        <TextArea label="Observações" placeholder="Vale citar que..." />
        <div className="pt-4">
          <Button
            label="Compartilhar orçamento"
            fullWidth
            backgroundColor="success"
          />
        </div>
      </div>
    </ModalBottom>
  );
};

export default memo(FinishBudgetProposal);
