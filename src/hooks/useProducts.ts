import { useQuery } from "react-query";
import { api } from "utils";

export const getProducts = async (): Promise<Product[]> => {
  const { data } = await api.get("products");

  const products = data.data.map((product) => {
    const { code, description, image, name, price } = product.data;

    return {
      objectID: code,
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
