import { memo, useCallback } from "react";
import { QuantitySelector } from "components/molecules";
import { useCart, useCartItem } from "contexts/cart";
import { useProductPrice } from "hooks";
import { useProductCard } from "..";

const ProductQuantitySelector = () => {
  const { code } = useProductCard();
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
    <QuantitySelector
      name="quantity"
      onValueChange={onQuantityChange}
      placeholder="Qtd"
      value={quantity}
      disabled={noPrice}
    />
  );
};

export default memo(ProductQuantitySelector);
