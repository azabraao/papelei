import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { productsMock } from "__mocks__";
import ProductCard from "./index";

jest.mock("contexts/cart", () => ({
  CartContext: {
    Provider: ({ children }) => children,
  },
  useCart: jest.fn(() => ({
    updateCartItemQuantity: jest.fn(),
    cartProducts: productsMock,
  })),
  useCartItem: jest.fn(() => ({
    quantity: 1,
  })),
}));

jest.mock("hooks", () => ({
  useProductPrice: jest.fn(() => ({
    formattedPrice: "R$ 100,00",
    noPrice: false,
  })),
}));

describe("ProductCard", () => {
  it("should render", () => {
    expect(render(<ProductCard {...productsMock[0]} />)).toBeTruthy();
  });
});
