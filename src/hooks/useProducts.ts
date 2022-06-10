import { useQuery } from "react-query";
import { api } from "utils";

type Product = {
  code: string;
  image: string;
  name: string;
  description: string;
  archived: boolean;
  price: {
    sale: {
      deferred: string;
      cash: string;
    };
    provider: string;
  };
};

export const getProducts = async (): Promise<Product[]> => {
  const { data } = await api.get("products");

  const products = data.data.map((product) => {
    const { archived, code, description, image, name, price } = product.data;

    return {
      archived,
      code,
      description,
      image,
      name,
      price,
    };
  });

  return products;
};

const useProducts = () => {
  return useQuery("products", getProducts, {
    staleTime: 1000 * 5,
  });
};

export default useProducts;
