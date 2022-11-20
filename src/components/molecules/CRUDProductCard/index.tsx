import { Button, SaveIcon, SpinnerIcon, TrashIcon } from "components/atoms";
import fetchJson from "lib/fetchJson";
import { memo, useState } from "react";
import { useForm } from "react-hook-form";
import { useSWRConfig } from "swr";
import { numberToMoney } from "utils";
import MoneyInput from "../Form/MoneyInput";
import TextInput from "../Form/TextInput";
import ImageUploader from "../ImageUploader";
import Modal from "../Modal";
import UndoDeleteSnackbar from "./UndoDeleteSnackbar";

import { validationSchema } from "./validationSchema";

const fetchDelete = (productID: string) => {
  return fetchJson("/api/product", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productID }),
  });
};

const fetchUpdate = (product: {
  name: string;
  image: string;
  price: number;
  productID: string;
}) => {
  console.log("product>>>", product);

  return fetchJson("/api/product", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
};

const ProductItem = (product: Product) => {
  const { name, image, price } = product;
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const { mutate } = useSWRConfig();
  const [isRemoved, setIsRemoved] = useState<boolean>(false);
  const [isRemoving, setIsRemoving] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const [uploadedImage, setUploadedImage] = useState<string>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    reValidateMode: "onChange",
  });

  const handleRemove = async () => {
    setIsRemoving(true);

    await mutate("/api/product", fetchDelete(product.id));

    setIsRemoved(true);
    setIsRemoving(false);
    closeModal();
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const onSubmit = async (data) => {
    setIsSaving(true);

    await mutate(
      "/api/product",
      fetchUpdate({
        image: uploadedImage,
        name: data.name,
        price: parseFloat(data.price.replace(",", ".")),
        productID: product.id,
      })
    );

    setIsSaving(false);
    closeModal();
  };

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
          <ImageUploader
            defaultImage={image}
            onImageChange={(dataImage) => setUploadedImage(dataImage)}
          />

          <div className="flex flex-col gap-4">
            <TextInput
              label="Nome"
              name="name"
              defaultValue={name}
              placeholder="Nome do produto"
              {...register("name", validationSchema.name)}
              error={errors?.name?.message as string}
            />
            <MoneyInput
              label="Valor"
              initialValue={price.toString()}
              name="price"
              placeholder="Valor"
              {...register("price", validationSchema.price)}
              error={errors?.valor?.message as string}
            />
          </div>

          <div className="flex justify-between pt-6">
            <Button
              icon={isRemoving ? <SpinnerIcon /> : <TrashIcon />}
              backgroundColor="white"
              onClick={handleRemove}
              className="text-danger"
              disabled={isRemoving || isSaving}
            >
              Remover
            </Button>
            <Button
              icon={isSaving ? <SpinnerIcon /> : <SaveIcon />}
              backgroundColor="success"
              className="text-white"
              onClick={handleSubmit(onSubmit)}
              disabled={isRemoving || isSaving}
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
