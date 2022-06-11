import "@testing-library/jest-dom";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { algolia } from "utils";
import Search from "./index";

jest.mock("utils");

afterEach(cleanup);

describe("Search", () => {
  it("should float to the top on search input focus", () => {
    render(<Search />);
    const input = screen.getByPlaceholderText("Escreva o nome do produto");
    const searchWrap = screen.getByTestId("search");

    fireEvent.focus(input);

    expect(searchWrap).toHaveClass("fixed top-0 left-0 right-0 z-10");
  });

  it("should display a loading state when user start to type", () => {
    render(<Search />);

    const input = screen.getByPlaceholderText("Escreva o nome do produto");

    fireEvent.change(input, { target: { value: "gesso" } });

    expect(screen.findByTestId("loading-state")).toBeTruthy();
  });

  it("should close search on Portal click", () => {
    render(<Search />);
    const input = screen.getByPlaceholderText("Escreva o nome do produto");
    const searchWrap = screen.getByTestId("search");
    fireEvent.focus(input);

    const portal = screen.getByTestId("portal");
    fireEvent.click(portal);

    expect(searchWrap).toHaveClass("relative");
  });

  it("should show an error message in case of error", async () => {
    render(<Search />);
    const input = await screen.findByPlaceholderText(
      "Escreva o nome do produto"
    );
    const searchMock = jest.mocked(algolia.search);
    searchMock.mockImplementationOnce(
      jest.fn(() => {
        throw new Error("Error");
      })
    );

    fireEvent.change(input, { target: { value: "gesso" } });

    const errorState = await waitFor(() => screen.findByTestId("error-state"));
    expect(errorState).toBeTruthy();
  });

  it("should show a message for when no products are found", async () => {
    render(<Search />);
    const input = screen.getByPlaceholderText("Escreva o nome do produto");
    const searchMock = jest.mocked(algolia.search);
    searchMock.mockImplementationOnce(
      jest.fn(() => {
        return {
          hits: [],
        } as any;
      })
    );

    fireEvent.change(input, {
      target: { value: "fake-value-to-not-find-any-product" },
    });

    const noProductsState = await waitFor(() =>
      screen.findByTestId("no-products-state")
    );
    expect(noProductsState).toBeInTheDocument();
  });

  it("should display a list of products for a given input value", async () => {
    render(<Search />);
    const input = screen.getByPlaceholderText("Escreva o nome do produto");
    const searchMock = jest.mocked(algolia.search);
    searchMock.mockImplementationOnce(
      jest.fn(() => {
        return {
          hits: [
            {
              code: "fake-code",
              image: "https://fake-image.com",
              name: "fake-name",
              description: "fake-description",
              archived: false,
              price: {
                sale: {
                  deferred: "R$20,00",
                  cash: "19,00",
                },
                provider: "R$20,00",
              },
            },
            {
              code: "fake-code",
              image: "https://fake-image.com",
              name: "fake-name",
              description: "fake-description",
              archived: false,
              price: {
                sale: {
                  deferred: "R$20,00",
                  cash: "19,00",
                },
                provider: "R$20,00",
              },
            },
          ],
        } as any;
      })
    );

    fireEvent.change(input, { target: { value: "gesso" } });

    const products = await waitFor(
      () => screen.findByTestId("search-list-products"),
      {
        timeout: 4000,
      }
    );

    expect(products).toBeInTheDocument();
  });

  // should add products to cart when user clicks on a product
  // should close the search list when user clicks outside the search input
  // should close the search list when user selects a product
  // should display an error message when user types an invalid value
  // should display a 'not found' message when a product is not found
});
