import { useProducts } from "hooks";
import useUser from "lib/useUser";
import { memo, useMemo } from "react";
import ErrorState from "./components/ErrorState";
import LoadingState from "./components/LoadingState";
import OnboardingState from "./components/OnboardingState";

const ListProducts = () => {
  const { user } = useUser();

  const businessID = useMemo(
    () => user?.business[0].id,
    [user?.business[0].id]
  );

  const { products, error } = useProducts({ businessID, skip: 0 });

  const isLoading = !products && !error;
  const noProducts = Array.isArray(products) && products?.length === 0;

  if (isLoading) return <LoadingState />;

  if (error) return <ErrorState />;

  if (noProducts) return <OnboardingState />;

  return (
    <div className="pt-10">
      {products.map((item) => (
        <li key={item.objectID}>{item.name}</li>
      ))}
    </div>
  );
};

export default memo(ListProducts);
