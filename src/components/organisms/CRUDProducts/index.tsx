import Spinner from "assets/spinner.svg";
import { PageHeader } from "components/atoms";
import useUser from "lib/useUser";
import { useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";
import AddProduct from "../AddProduct";
import CRUD from "./components/CRUD";
import ErrorState from "./components/ErrorState";
import LoadingState from "./components/LoadingState";
import OnboardingState from "./components/OnboardingState";

const fetcher = (url) => fetch(url).then((res) => res.json());

const CRUDProducts = () => {
  const PRODUCT_CARD_HEIGHT = 111;
  const BROWSER_VIEWPORT_HEIGHT = window.innerHeight;
  const PAGE_SIZE = Math.round(BROWSER_VIEWPORT_HEIGHT / PRODUCT_CARD_HEIGHT);

  const { user } = useUser();

  const businessID = user?.business[0]?.id;
  const [shouldLoadMoreProducts, setShouldLoadMoreProducts] =
    useState<boolean>(false);

  const { data, error, size, setSize, mutate } = useSWRInfinite(
    (index) =>
      `api/products?businessID=${businessID}&skip=${
        index * PAGE_SIZE
      }&take=${PAGE_SIZE}`,
    fetcher
  );

  const products = data ? [].concat(...data.map(({ product }) => product)) : [];

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = products?.length === 0;

  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.product?.length < PAGE_SIZE);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const pageEnded =
        Math.round(window.innerHeight + window.scrollY) >=
        document.body.offsetHeight;

      if (pageEnded) setShouldLoadMoreProducts(true);
    });
  }, []);

  useEffect(() => {
    if (shouldLoadMoreProducts && !isLoadingMore && !isReachingEnd) {
      setSize(size + 1);
      setShouldLoadMoreProducts(false);
    }
  }, [shouldLoadMoreProducts, isLoadingMore]);

  return (
    <>
      <AddProduct reloadProducts={mutate} />
      <PageHeader>{isEmpty ? "Adicione produtos" : "Produtos"}</PageHeader>
      {isLoadingInitialData ? (
        <LoadingState />
      ) : error ? (
        <ErrorState />
      ) : isEmpty ? (
        <OnboardingState />
      ) : (
        <>
          <CRUD products={products} />
          {isLoadingMore && (
            <div className="flex justify-between items-center py-5">
              <Spinner width={80} height={80} />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CRUDProducts;
