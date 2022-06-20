import { memo, useMemo } from "react";
import clsx from "clsx";
import { useProductPrice } from "hooks";
import { useProductCard } from "..";

const ProductTotalPrice = () => {
  const { error, code } = useProductCard();
  const { formattedPrice, noPrice } = useProductPrice(code);

  const priceShown = useMemo(() => {
    if (error && noPrice) return "Defina um preço";

    if (noPrice) return "Sem preço";

    return formattedPrice;
  }, [error, noPrice, formattedPrice]);

  return (
    <h3
      className={clsx("font-medium ", {
        "text-danger": noPrice,
      })}
    >
      {priceShown}
    </h3>
  );
};

export default memo(ProductTotalPrice);
