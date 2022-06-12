import "@testing-library/jest-dom";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { SearchProvider } from "contexts/search";
import { algolia } from "utils";
import Search from "./index";

jest.mock("utils");

const mockedAddToCard = jest.fn();

jest.mock("contexts/cart", () => {
  return {
    useCart: jest.fn(() => {
      return {
        addToCart: mockedAddToCard,
      };
    }),
  };
});
jest.mock("contexts/cart");

afterEach(cleanup);

const productsMock = [
  {
    code: "fake-code-0",
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
    code: "fake-code-1",
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
];

const searchImplementationMock = jest.fn(() => {
  return {
    hits: productsMock,
  } as any;
});

const emptySearchImplementationMock = jest.fn(() => {
  return {
    hits: [],
  } as any;
});

const SearchComponent = () => (
  <SearchProvider>
    <Search />
  </SearchProvider>
);

describe("Search", () => {
  it("should render", () => {
    expect(render(<SearchComponent />)).toBeTruthy();
  });

  it("should float to the top on search input focus", () => {
    render(<SearchComponent />);
    const input = screen.getByPlaceholderText("Escreva o nome do produto");
    const searchWrap = screen.getByTestId("search");

    fireEvent.focus(input);

    expect(searchWrap).toHaveClass("fixed top-0 left-0 right-0 z-10");
  });

  it("should display a loading state when user start to type", () => {
    render(<SearchComponent />);

    const input = screen.getByPlaceholderText("Escreva o nome do produto");

    fireEvent.change(input, { target: { value: "gesso" } });

    expect(screen.findByTestId("loading-state")).toBeTruthy();
  });

  it("should close search on Portal click", () => {
    render(<SearchComponent />);
    const input = screen.getByPlaceholderText("Escreva o nome do produto");
    const searchWrap = screen.getByTestId("search");
    fireEvent.focus(input);

    const portal = screen.getByTestId("portal");
    fireEvent.click(portal);

    expect(searchWrap).toHaveClass("relative");
  });

  it("should show an error message in case of error", async () => {
    render(<SearchComponent />);
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
    render(<SearchComponent />);
    const input = screen.getByPlaceholderText("Escreva o nome do produto");
    const searchMock = jest.mocked(algolia.search);
    searchMock.mockImplementationOnce(emptySearchImplementationMock);

    fireEvent.focus(input);
    fireEvent.change(input, {
      target: { value: "fake-value-to-not-find-any-product" },
    });

    const noProductsState = await waitFor(() =>
      screen.findByTestId("no-products-state")
    );
    expect(noProductsState).toBeInTheDocument();
  });

  it("should display a list of products for a given input value", async () => {
    render(<SearchComponent />);
    const input = screen.getByPlaceholderText("Escreva o nome do produto");
    const searchMock = jest.mocked(algolia.search);
    searchMock.mockImplementationOnce(searchImplementationMock);

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "gesso" } });

    const products = await waitFor(() =>
      screen.findByTestId("search-list-products")
    );
    expect(products).toBeInTheDocument();
  });

  it("should add products to cart when user clicks on a product", async () => {
    render(<SearchComponent />);
    const input = screen.getByPlaceholderText("Escreva o nome do produto");
    const searchMock = jest.mocked(algolia.search);
    searchMock.mockImplementationOnce(searchImplementationMock);

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "gesso" } });

    const products = await waitFor(() =>
      screen.findAllByTestId("search-list-product")
    );

    fireEvent.click(products[0]);

    expect(mockedAddToCard).toHaveBeenCalledWith(productsMock[0]);
  });

  it("should close the search list when user selects a product", async () => {
    render(<SearchComponent />);
    const input = screen.getByPlaceholderText("Escreva o nome do produto");
    const searchMock = jest.mocked(algolia.search);
    searchMock.mockImplementationOnce(searchImplementationMock);

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "gesso" } });

    const products = await waitFor(() =>
      screen.findAllByTestId("search-list-product")
    );
    fireEvent.click(products[0]);

    expect(screen.queryByTestId("search-list-products")).toBeNull();
  });
});
