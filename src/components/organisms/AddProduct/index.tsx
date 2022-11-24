import {
  Button,
  FloatingButton,
  ModalBottom,
  PlusIcon,
  SaveIcon,
  SpinnerIcon,
  TrashIcon,
} from "components/atoms";
import { ImageUploader, MoneyInput, TextInput } from "components/molecules";
import fetchJson from "lib/fetchJson";
import useUser from "lib/useUser";
import { memo, useState } from "react";
import { useForm } from "react-hook-form";
import { useSWRConfig } from "swr";
import { numberToMoney } from "utils";

import { validationSchema } from "./validationSchema";

const fetchPost = (product: {
  name: string;
  image: string;
  price: number;
  businessID: string;
}) => {
  return fetchJson("/api/product", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
};

const AddProduct = () => {
  const { mutate } = useSWRConfig();
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isAddingProduct, setIsAddingProduct] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const { user } = useUser();

  const [uploadedImage, setUploadedImage] = useState<string>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    reValidateMode: "onChange",
  });

  const onSubmit = async (data) => {
    setIsSaving(true);
    await mutate(
      "/api/product",
      fetchPost({
        image: uploadedImage,
        name: data.name,
        price: parseFloat(data.price.replace(",", ".")),
        businessID: user.business[0].id,
      })
    );

    setIsSaving(false);
    setIsAddingProduct(false);
    reset();
  };

  return (
    <>
      <FloatingButton onClick={() => setIsAddingProduct(true)}>
        <PlusIcon />
      </FloatingButton>
      <ModalBottom
        isOpen={isAddingProduct}
        closeModalBottom={() => setIsAddingProduct(false)}
      >
        <div className="p-4 flex flex-col gap-6">
          <article>
            <p className="text-lg">Novo produto</p>
          </article>
          <ImageUploader
            onImageChange={(dataImage) => setUploadedImage(dataImage)}
          />

          <div className="flex flex-col gap-4">
            <TextInput
              label="Nome"
              name="name"
              placeholder="Nome do produto"
              {...register("name", validationSchema.name)}
              error={errors?.name?.message as string}
            />
            <MoneyInput
              label="Valor"
              name="price"
              placeholder="Valor"
              {...register("price", validationSchema.price)}
              error={errors?.price?.message as string}
            />
          </div>

          <div className="flex justify-between pt-6">
            <Button
              backgroundColor="success"
              className="text-white"
              onClick={handleSubmit(onSubmit)}
              disabled={isSaving}
              fullWidth
            >
              Salvar produto
            </Button>
          </div>
        </div>
      </ModalBottom>
    </>
  );
};

export default memo(AddProduct);