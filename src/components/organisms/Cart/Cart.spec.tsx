import "@testing-library/jest-dom";
import { render, renderHook, screen } from "@testing-library/react";
import { CartProvider, useCart } from "contexts/cart";
import { productsMock } from "__mocks__";
import Cart from "./index";
interface CartProduct extends Product {
  quantity: number;
}

interface CartContextValues {
  addToCart: (product: Product) => void;
  // removeFromCart: (product: Product) => void;
  cartProducts: CartProduct[];
}
const mockedAddToCard = jest.fn();

// jest.mock("contexts/cart", () => {
//   return {
//     useCart: jest.fn(() => {
//       return {
//         addToCart: mockedAddToCard,
//         cartProducts: productsMock,
//       };
//     }),
//     CartProvider: CartProvider,
//   };
// });

const CartComponent = () => {
  return (
    <CartProvider>
      <Cart />
    </CartProvider>
  );
};

describe("Cart", () => {
  it("should render", () => {
    render(<CartComponent />);
  });

  // it("should render a list of products from the cart", () => {
  //   render(<CartComponent />);
  //   const result = renderHook(() => useCart());
  //   console.log("result>>>", result);
  //   // addToCart(productsMock[0]);
  //   // addToCart(productsMock[1]);
  //   // expect(cartProducts).toHaveLength(2);
  //   // const products = screen.getAllByTestId("product-cart");
  //   // expect(products).toHaveLength(productsMock.length);
  // });
  // it("should toggle the products price on payment method toggle", () => {
  //   render(<CartComponent />);
  // });
  // it("should remove a product from cart on drag to top", () => {
  //   render(<CartComponent />);
  // });
  // it("should increase budget value total on new product added", () => {
  //   render(<CartComponent />);
  // });
  // it("should increase the budget value total on product quantity change", () => {
  //   render(<CartComponent />);
  // });
  // it("should open product modal on product click", () => {
  //   render(<CartComponent />);
  // });
});
