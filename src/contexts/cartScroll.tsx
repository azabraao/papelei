import React, {
  createContext,
  memo,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { useCart } from "./cart";

interface CartScrollContextValues {
  isScrolling: boolean;
  setIsScrolling: (isScrolling: boolean) => void;
  cartScrollRef: React.RefObject<HTMLDivElement>;
  scrollTo: (productCode: string) => void;
}

export const CartScrollContext = createContext({} as CartScrollContextValues);

interface CartScrollProps {
  children: React.ReactNode;
}

export const CartScrollProvider = ({ children }: CartScrollProps) => {
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const { cartProducts } = useCart();
  const cartScrollRef = useRef(null);

  const scrollTo = useCallback(
    (productCode: string) => {
      const productIndex = cartProducts.findIndex(
        (item) => item.code === productCode
      );
      const cardSpace = 163 + 16;
      const scrollTo = productIndex * cardSpace;

      cartScrollRef.current.scroll({
        top: 0,
        left: scrollTo,
        behavior: "smooth",
      });
    },
    [cartProducts, cartScrollRef]
  );

  return (
    <CartScrollContext.Provider
      value={{
        cartScrollRef,
        isScrolling,
        setIsScrolling,
        scrollTo,
      }}
    >
      {children}
    </CartScrollContext.Provider>
  );
};

export default memo(CartScrollProvider);

export const useCartScroll = (): CartScrollContextValues => {
  const context = useContext(CartScrollContext);
  if (!context)
    throw new Error("useCartScroll must be used within a CartScrollProvider");

  return context;
};
