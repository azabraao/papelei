import { Button, SaveIcon, SpinnerIcon, TrashIcon } from "components/atoms";
import fetchJson from "lib/fetchJson";
import { memo, useState } from "react";
import { useSWRConfig } from "swr";
import { numberToMoney } from "utils";
import MoneyInput from "../Form/MoneyInput";
import TextInput from "../Form/TextInput";
import ImageUploader from "../ImageUploader";
import Modal from "../Modal";
import UndoDeleteSnackbar from "./UndoDeleteSnackbar";

const fetchDelete = (productID: string) => {
  return fetchJson("/api/product", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productID }),
  });
};

const ProductItem = (product: Product) => {
  const { name, image, price } = product;
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const { mutate } = useSWRConfig();
  const [isRemoved, setIsRemoved] = useState<boolean>(false);
  const [isRemoving, setIsRemoving] = useState<boolean>(false);

  const handleRemove = async () => {
    setIsRemoving(true);

    await mutate("/api/product", fetchDelete(product.id));

    closeModal();
    setIsRemoved(true);
    setIsRemoving(false);
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  if (isRemoved)
    return (
      <UndoDeleteSnackbar
        product={product}
        onUndo={() => setIsRemoved(false)}
      />
    );

  return (
    <>
      <Modal isOpen={modalIsOpen} close={closeModal}>
        <div className="p-4 flex flex-col gap-6">
          <ImageUploader defaultImage={image} onImageChange={console.log} />

          <div className="flex flex-col gap-4">
            <TextInput
              label="Nome"
              onChange={console.log}
              defaultValue={name}
            />
            <MoneyInput
              label="Valor"
              onChange={console.log}
              initialValue={price}
            />
          </div>

          <div className="flex justify-between pt-6">
            <Button
              icon={isRemoving ? <SpinnerIcon /> : <TrashIcon />}
              backgroundColor="white"
              onClick={handleRemove}
              className="text-danger"
              disabled={isRemoving}
            >
              Remover
            </Button>
            <Button
              icon={<SaveIcon />}
              backgroundColor="success"
              className="text-white"
            >
              Salvar
            </Button>
          </div>
        </div>
      </Modal>

      <div
        onClick={openModal}
        className="cursor-pointer p-4 flex items-center gap-4 rounded-lg shadow-card-effect-soft text-black-70 bg-white"
      >
        <img
          src={image}
          alt={name}
          width={80}
          height={80}
          className="rounded-lg h-20 w-20"
        />
        <div className="flex flex-col gap-2 w-full">
          <span className="text-base">{name}</span>
          <div className="flex gap-2 flex-wrap justify-between w-full">
            <strong className="text-xl flex-1 flex items-center">
              {numberToMoney(price)}
            </strong>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(ProductItem);
