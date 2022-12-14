import {
  Button,
  FloatingButton,
  ModalBottom,
  PlusIcon,
} from "components/atoms";
import { ImageUploader, MoneyInput, TextInput } from "components/molecules";
import fetchJson from "lib/fetchJson";
import useUser from "lib/useUser";
import { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSWRConfig } from "swr";
import { useRouter } from "next/router";

import { validationSchema } from "./validationSchema";
import { moneyToNumber } from "utils";

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

interface AddProductProps {
  reloadProducts: VoidFunction;
}

const AddProduct = ({ reloadProducts }: AddProductProps) => {
  const { mutate } = useSWRConfig();
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const router = useRouter();
  const [isAddingProduct, setIsAddingProduct] = useState<boolean>(
    !!router.query.addProduct
  );
  const { user } = useUser();
  const [shouldResetForm, setShouldResetForm] = useState<boolean>(false);

  const [uploadedImage, setUploadedImage] = useState<string>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (shouldResetForm) {
      reset();
      setUploadedImage(null);
      setShouldResetForm(false);
      setIsSaving(false);
    }
  }, [shouldResetForm]);

  useEffect(() => {
    if (!isAddingProduct) {
      setShouldResetForm(true);
    }
  }, [isAddingProduct]);

  const onSubmit = async (data) => {
    setIsSaving(true);

    await mutate(
      "/api/product",
      fetchPost({
        image: uploadedImage,
        name: data.name,
        price: moneyToNumber(data.price),
        businessID: user.business[0].id,
      })
    );

    reloadProducts();
    setIsSaving(false);
    setIsAddingProduct(false);
    setShouldResetForm(true);
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="py-4 flex flex-col gap-6"
        >
          <article>
            <p className="text-lg">Novo produto</p>
          </article>
          <ImageUploader
            shouldReset={shouldResetForm}
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
              shouldReset={shouldResetForm}
            />
          </div>

          <div className="flex justify-between pt-6">
            <Button
              backgroundColor="success"
              className="text-white"
              disabled={isSaving}
              fullWidth
            >
              Salvar produto
            </Button>
          </div>
        </form>
      </ModalBottom>
    </>
  );
};

export default memo(AddProduct);
