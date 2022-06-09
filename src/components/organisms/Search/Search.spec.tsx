import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Search from "./index";

describe("Search", () => {
  it("should render", () => {
    expect(render(<Search />)).toBeTruthy();
  });

  it("should float to the top on search input focus", () => {
    render(<Search />);
    const input = screen.getByPlaceholderText("Escreva o nome do produto");
    const searchWrap = screen.getByTestId("search");

    fireEvent.focus(input);

    expect(searchWrap).toHaveClass("fixed top-0 left-0 right-0 z-10");
  });

  // should display a loading state when user start to type
  // should display a list of products for a given input value
  // should add products to cart when user clicks on a product
  // should close the search list when user clicks outside the search input
  // should close the search list when user selects a product
  // should display an error message when user types an invalid value
  // should display a 'not found' message when a product is not found
});
