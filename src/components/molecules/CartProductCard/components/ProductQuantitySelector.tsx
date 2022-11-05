import { memo, useCallback } from "react";
import { QuantitySelector } from "components/molecules";
import { useCart, useCartItem } from "contexts/cart";
import { useProductPrice } from "hooks";
import { useProductCard } from "..";
import clsx from "clsx";

const ProductQuantitySelector = () => {
  const { code, isExpanded } = useProductCard();
  const { quantity } = useCartItem(code);
  const { noPrice } = useProductPrice(code);

  const { updateCartItemQuantity, cartProducts } = useCart();

  const onQuantityChange = useCallback(
    (quantity) => {
      updateCartItemQuantity(code, quantity);
    },
    [cartProducts]
  );

  return (
    <div
      className={clsx("pl-4  pr-4", {
        "pb-4": !isExpanded,
      })}
    >
      <QuantitySelector
        name="quantity"
        label={isExpanded ? "Quantidade" : ""}
        onValueChange={onQuantityChange}
        placeholder="Qtd"
        value={quantity}
        disabled={noPrice}
      />
    </div>
  );
};

export default memo(ProductQuantitySelector);
