import { memo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, ModalBottom } from "components/atoms";
import { TextArea, TextInput } from "components/molecules";
import { useBudgetProposal } from "contexts/budgetProposal";
import { useCart } from "contexts/cart";
import { numberToMoney } from "utils";

const FinishBudgetProposal = () => {
  const {
    isFinishing,
    closeBudgetProposal,
    addClientAddress,
    addClientName,
    client,
    addComments,
  } = useBudgetProposal();
  const { cartTotal } = useCart();

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data) => console.log(data);

  const onNameChange = useCallback(
    (event) => {
      clearErrors("customerName");
      addClientName(event.target.value);
    },
    [client]
  );

  const onAddressChange = useCallback(
    (event) => {
      clearErrors("customerAddress");
      addClientAddress(event.target.value);
    },
    [client]
  );

  const onCommentsChange = useCallback(
    (event) => {
      addComments(event.target.value);
    },
    [client]
  );

  return (
    <ModalBottom isOpen={isFinishing} closeModalBottom={closeBudgetProposal}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 pb-6"
      >
        <div className="flex justify-between items-center">
          <span className="text-lg text-black-70">Fechar orçamento</span>
          <span className="text-lg text-black-70">
            {numberToMoney(cartTotal)}
          </span>
        </div>
        <TextInput
          label="Nome do cliente"
          placeholder="João Fulano"
          name="customerName"
          {...register("customerName", {
            required: {
              value: true,
              message: "Qual é o nome do cliente?",
            },
            maxLength: 80,
          })}
          error={errors?.customerName?.message}
          onChange={onNameChange}
        />
        <TextInput
          label="Endereço"
          placeholder="Rua das Flores, nº 0"
          name="customerAddress"
          {...register("customerAddress", {
            required: {
              value: true,
              message: "Qual é o endereço do cliente?",
            },
            maxLength: 80,
          })}
          error={errors?.customerAddress?.message}
          onChange={onAddressChange}
        />
        <TextArea
          label="Observações"
          placeholder="Vale citar que..."
          name="budgetComments"
          onChange={onCommentsChange}
          {...register("budgetComments", { required: false })}
        />
        <div className="pt-4">
          <Button
            label="Compartilhar orçamento"
            fullWidth
            backgroundColor="success"
          />
        </div>
      </form>
    </ModalBottom>
  );
};

export default memo(FinishBudgetProposal);
