import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import ProductCard from "./index";

describe("ProductCard", () => {
  it("should render", () => {
    expect(render(<ProductCard />)).toBeTruthy();
  });
});
