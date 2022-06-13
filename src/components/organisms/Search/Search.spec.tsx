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

const openSearchWindow = () => {
  render(<SearchComponent />);
  const buttonOpenSearch = screen.getByTestId("button-open-search");

  fireEvent.click(buttonOpenSearch);
};

describe("Search", () => {
  it("should open the search window on button open search click", async () => {
    openSearchWindow();

    const searchWindow = await waitFor(() =>
      screen.getByTestId("search-window")
    );

    expect(searchWindow).toBeInTheDocument();
  });

  it("should display a loading state when user start to type", () => {
    openSearchWindow();
    const input = screen.getByPlaceholderText("Escreva o nome do produto");

    fireEvent.change(input, { target: { value: "gesso" } });

    expect(screen.findByTestId("loading-state")).toBeTruthy();
  });

  it("should close search on Portal click", async () => {
    openSearchWindow();

    const portal = screen.getByTestId("portal");
    fireEvent.click(portal);

    const buttonOpenSearch = await waitFor(() =>
      screen.getByTestId("button-open-search")
    );
    expect(buttonOpenSearch).toBeInTheDocument();
  });

  it("should show an error message in case of error", async () => {
    openSearchWindow();
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
    openSearchWindow();

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
    openSearchWindow();
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
    openSearchWindow();
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
    openSearchWindow();
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
