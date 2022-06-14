import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { CartProvider } from "contexts/cart";
import { productsMock } from "__mocks__";
import ProductCard from "./index";

describe("ProductCard", () => {
  it("should render", () => {
    expect(
      render(
        <CartProvider>
          <ProductCard {...productsMock[0]} />
        </CartProvider>
      )
    ).toBeTruthy();
  });
});
