import { useCart, useCartItem } from "contexts/cart";
import { useMemo } from "react";
import { numberToMoney } from "utils";

const useProductPrice = (productCode) => {
  const { paymentMethod } = useCart();

  const { price, quantity } = useCartItem(productCode);

  const priceByMethod = useMemo(() => {
    if (paymentMethod === "cash") return price.sale.cash;
    if (paymentMethod === "deferred") return price.sale.deferred;
    return price.sale.cash;
  }, [price, paymentMethod]);

  const noPrice = useMemo(() => {
    if (paymentMethod === "cash" && !price.sale.cash) return true;
    if (paymentMethod === "deferred" && !price.sale.deferred) return true;

    return false;
  }, [price, paymentMethod]);

  const formattedPrice = useMemo(() => {
    if (noPrice) return null;

    const total = Number(priceByMethod) * quantity;
    return numberToMoney(total.toFixed(2));
  }, [price, noPrice, quantity]);

  return {
    noPrice,
    formattedPrice,
  };
};

export default useProductPrice;
