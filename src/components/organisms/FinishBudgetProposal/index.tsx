import { memo, useCallback, useEffect, useState } from "react";
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
    shouldDownload,
    setShouldDownload,
    addComments,
  } = useBudgetProposal();
  const { cartTotal } = useCart();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const customerName = watch("customerName");
  const customerAddress = watch("customerAddress");
  const budgetComments = watch("budgetComments");

  useEffect(() => {
    addClientName(customerName);
    setShouldDownload(false);
  }, [customerName]);

  useEffect(() => {
    addClientAddress(customerAddress);
    setShouldDownload(false);
  }, [customerAddress]);
  useEffect(() => {
    addComments(budgetComments);
    setShouldDownload(false);
  }, [budgetComments]);

  const onSubmit = useCallback(() => setShouldDownload(true), []);

  return (
    <ModalBottom
      testid={
        isFinishing ? "budget-modal-bottom-open" : "budget-modal-bottom-closed"
      }
      isOpen={isFinishing}
      closeModalBottom={closeBudgetProposal}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 pb-6"
        data-testid="budget-modal-bottom-form"
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
          testid="budget-modal-bottom-customer-name"
          {...register("customerName", validationSchema.customerName)}
          error={errors?.customerName?.message}
        />
        <TextInput
          label="Endereço"
          placeholder="Rua das Flores, nº 0"
          name="customerAddress"
          testid="budget-modal-bottom-customer-address"
          {...register("customerAddress", validationSchema.customerAddress)}
          error={errors?.customerAddress?.message}
        />
        <TextArea
          label="Observações"
          placeholder="Vale citar que..."
          name="budgetComments"
          testid="budget-modal-bottom-comments"
          {...register("budgetComments", validationSchema.budgetComments)}
        />
        <div className="pt-4">
          {shouldDownload ? <DownloadButton /> : <SubmitButton />}
        </div>
      </form>
    </ModalBottom>
  );
};

export default memo(FinishBudgetProposal);
