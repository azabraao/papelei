import { useCart, useCartItem } from "contexts/cart";
import { useMemo } from "react";
import { numberToMoney } from "utils";

const useProductPrice = (productCode) => {
  const { paymentMethod } = useCart();

  const { price, quantity } = useCartItem(productCode);

  const priceByMethod = useMemo(() => {
    if (paymentMethod === "cash") return price;
    if (paymentMethod === "deferred") return price;
    return price;
  }, [price, price, paymentMethod]);

  const noPrice = useMemo(() => {
    if (paymentMethod === "cash" && !price) return true;
    if (paymentMethod === "deferred" && !price) return true;

    return false;
  }, [price, price, paymentMethod]);

  const formattedPrice = useMemo(() => {
    if (noPrice) return null;

    const total = Number(priceByMethod) * quantity;
    return numberToMoney(total.toFixed(2));
  }, [price, price, noPrice, quantity]);

  const noFormattedPrice = useMemo(() => {
    if (noPrice) return null;

    const total = Number(priceByMethod) * quantity;
    return total.toFixed(2);
  }, [price, price, noPrice, quantity]);

  return {
    noPrice,
    formattedPrice,
    noFormattedPrice,
  };
};

export default useProductPrice;
