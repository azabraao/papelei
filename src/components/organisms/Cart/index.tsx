import { memo } from "react";
import { CartScrollProvider } from "contexts/cartScroll";
import Component from "./Component";

const Cart = () => {
  return (
    <CartScrollProvider>
      <Component />
    </CartScrollProvider>
  );
};

export default memo(Cart);
