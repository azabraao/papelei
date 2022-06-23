import { memo, useMemo } from "react";
import clsx from "clsx";
import { useProductPrice } from "hooks";
import { useProductCard } from "..";

const ProductTotalPrice = () => {
  const { error, code, isExpanded } = useProductCard();
  const { formattedPrice, noPrice } = useProductPrice(code);

  const priceShown = useMemo(() => {
    if (error && noPrice) return "Defina um preço";

    if (noPrice) return "Sem preço";

    return formattedPrice;
  }, [error, noPrice, formattedPrice]);

  return (
    <h3
      className={clsx("font-medium pl-4 pr-4", {
        "text-danger": noPrice,
        "mb-1": !isExpanded,
        "text-3xl font-bold mb-2 mt-2": isExpanded,
      })}
      data-testid="product-card-total-price"
    >
      {priceShown}
    </h3>
  );
};

export default memo(ProductTotalPrice);
