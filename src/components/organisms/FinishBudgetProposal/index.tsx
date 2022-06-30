import { memo, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { ModalBottom } from "components/atoms";
import { TextArea, TextInput } from "components/molecules";
import { useBudgetProposal } from "contexts/budgetProposal";
import { useCart } from "contexts/cart";
import { numberToMoney } from "utils";
import DownloadButton from "./DownloadButton";
import SubmitButton from "./SubmitButton";
import { validationSchema } from "./validationSchema";

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

  const [allowShare, setAllowShare] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = () => setAllowShare(true);

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
          {...register("customerName", validationSchema.customerName)}
          error={errors?.customerName?.message}
          onChange={onNameChange}
        />
        <TextInput
          label="Endereço"
          placeholder="Rua das Flores, nº 0"
          name="customerAddress"
          {...register("customerAddress", validationSchema.customerAddress)}
          error={errors?.customerAddress?.message}
          onChange={onAddressChange}
        />
        <TextArea
          label="Observações"
          placeholder="Vale citar que..."
          name="budgetComments"
          onChange={onCommentsChange}
          {...register("budgetComments", validationSchema.budgetComments)}
        />
        <div className="pt-4">
          {allowShare ? <DownloadButton /> : <SubmitButton />}
        </div>
      </form>
    </ModalBottom>
  );
};

export default memo(FinishBudgetProposal);
