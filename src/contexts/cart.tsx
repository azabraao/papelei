import React, {
  createContext,
  memo,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface CartProduct extends Product {
  quantity: number;
}

interface CartContextValues {
  addToCart: (product: Product) => void;
  setPaymentMethod: (method: string) => void;
  updateCartItemQuantity: (code: string, quantity: number) => void;
  // removeFromCart: (product: Product) => void;
  cartProducts: CartProduct[];
  cartIsEmpty: boolean;
  paymentMethod: string;
}

export const CartContext = createContext({} as CartContextValues);

interface CartProps {
  children: React.ReactNode;
}

export const CartProvider = ({ children }: CartProps) => {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<string>("in-cash");

  const updateCartItemQuantity = useCallback(
    (code: string, quantity: number) => {
      const productIndex = cartProducts.findIndex(
        (cartProduct) => cartProduct.code === code
      );
      const newCartProducts = [...cartProducts];
      newCartProducts[productIndex].quantity = quantity;

      setCartProducts(newCartProducts);
    },
    [cartProducts]
  );

  const addToCart = useCallback(
    (product: Product) => {
      const productIsInCart = cartProducts.find(
        (cartProduct) => cartProduct.code === product.code
      );

      if (productIsInCart) {
        return updateCartItemQuantity(
          product.code,
          productIsInCart.quantity + 1
        );
      }

      setCartProducts((cartProducts) => [
        ...cartProducts,
        {
          ...product,
          quantity: 1,
        },
      ]);
    },
    [cartProducts]
  );

  const cartIsEmpty = useMemo(() => cartProducts.length === 0, [cartProducts]);

  return (
    <CartContext.Provider
      value={{
        addToCart,
        setPaymentMethod,
        updateCartItemQuantity,
        paymentMethod,
        cartProducts,
        cartIsEmpty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default memo(CartProvider);

export const useCart = (): CartContextValues => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");

  return context;
};

export const useCartItem = (productCode: string): CartProduct => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");

  const { cartProducts } = context;

  const cartItem = cartProducts.find(
    (cartProduct) => cartProduct.code === productCode
  );

  return cartItem;
};
