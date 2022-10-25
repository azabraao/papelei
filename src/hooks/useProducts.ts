import fetchJson from "lib/fetchJson";
import useSWR from "swr";

interface getProductsProps {
  businessID: string;
  skip: number;
}

export const useProducts = ({ businessID, skip }: getProductsProps) => {
  const fetcher = async (url) => {
    const { product } = await fetchJson<{ product: Product[] }>(
      `${url}?businessID=${businessID}&skip=${skip}`,
      { method: "GET" }
    );

    return product;
  };

  const { data, error } = useSWR(
    () => (businessID ? "api/products" : null),
    fetcher
  );

  return { products: data, error };
};

export default useProducts;
