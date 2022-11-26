import React, {
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface CartContextValues {
  addToCart: (product: Product) => void;
  setPaymentMethod: (method: "cash" | "deferred") => void;
  updateCartItemPrice: (id: string, price: number) => void;
  updateCartItemQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  cartProducts: CartProduct[];
  cartIsEmpty: boolean;
  paymentMethod: string;
  cartTotal: number;
}

export const CartContext = createContext({} as CartContextValues);

interface CartProps {
  children: React.ReactNode;
}

export const CartProvider = ({ children }: CartProps) => {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [paymentMethod, setPaymentMethod] =
    useState<"cash" | "deferred">("deferred");
  const [cartTotal, setCartTotal] = useState<number>(0);

  useEffect(() => {
    if (cartProducts.length > 0) {
      setCartTotal(
        cartProducts.reduce((acc, curr) => {
          return acc + curr.price * curr.quantity;
        }, 0)
      );
    } else {
      setCartTotal(0);
    }
  }, [cartProducts]);

  const updateCartItemQuantity = useCallback(
    (id: string, quantity: number) => {
      const productIndex = cartProducts.findIndex(
        (cartProduct) => cartProduct.objectID === id
      );
      const newCartProducts = [...cartProducts];
      newCartProducts[productIndex].quantity = quantity;

      setCartProducts(newCartProducts);
    },
    [cartProducts]
  );

  const updateCartItemPrice = useCallback(
    (id: string, price: number) => {
      const productIndex = cartProducts.findIndex(
        (cartProduct) => cartProduct.objectID === id
      );
      const newCartProducts = [...cartProducts];
      newCartProducts[productIndex].price = price;
      newCartProducts[productIndex].isValid = !!price;

      setCartProducts(newCartProducts);
    },
    [cartProducts, paymentMethod]
  );

  const addToCart = useCallback(
    (product: Product) => {
      console.log("cartProduct>>>", cartProducts);

      const productIsInCart = cartProducts.find(
        (cartProduct) => cartProduct.objectID === product.objectID
      );

      if (productIsInCart) {
        return updateCartItemQuantity(
          product.objectID,
          productIsInCart.quantity + 1
        );
      }

      setCartProducts((cartProducts) => [
        ...cartProducts,
        {
          ...product,
          quantity: 1,
          isValid: !!product.price,
        },
      ]);
    },
    [cartProducts]
  );

  const removeFromCart = useCallback(
    (id) => {
      setCartProducts((cartProducts) =>
        cartProducts.filter((cartProduct) => cartProduct.objectID !== id)
      );
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
        removeFromCart,
        updateCartItemPrice,
        paymentMethod,
        cartProducts,
        cartIsEmpty,
        cartTotal,
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

export const useCartItem = (productId: string): CartProduct => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");

  const { cartProducts } = context;

  const cartItem = cartProducts.find(
    (cartProduct) => cartProduct.objectID === productId
  );

  return cartItem;
};
