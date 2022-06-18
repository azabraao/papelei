import React, { createContext, memo, useContext, useState } from "react";

interface CartScrollContextValues {
  isScrolling: boolean;
  setIsScrolling: (isScrolling: boolean) => void;
}

export const CartScrollContext = createContext({} as CartScrollContextValues);

interface CartScrollProps {
  children: React.ReactNode;
}

export const CartScrollProvider = ({ children }: CartScrollProps) => {
  const [isScrolling, setIsScrolling] = useState<boolean>(false);

  return (
    <CartScrollContext.Provider
      value={{
        isScrolling,
        setIsScrolling,
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
