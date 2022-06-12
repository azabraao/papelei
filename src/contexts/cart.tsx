import React, { createContext, memo, useCallback, useContext } from "react";

interface CartProduct extends Product {
  quantity: number;
}

interface CartContextValues {
  addToCart: (product: Product) => void;
  // removeFromCart: (product: Product) => void;
  cartProducts: CartProduct[];
}

export const CartContext = createContext({} as CartContextValues);

interface CartProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProps> = ({ children }) => {
  const [cartProducts, setCartProducts] = React.useState<CartProduct[]>([]);

  const addToCart = useCallback((product: Product) => {
    // const productIsInCart = cartProducts.some(
    //     (cartProduct) => cartProduct.code === product.code
    // );

    // if (productIsInCart) return;

    setCartProducts((cartProducts) => [
      ...cartProducts,
      {
        ...product,
        quantity: 1,
      },
    ]);
  }, []);

  return (
    <CartContext.Provider
      value={{
        addToCart,
        cartProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default memo(CartProvider);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");

  return context;
};
