import { queryAllProducts } from "pages/api/products";
import { fauna } from "services/fauna";

jest.mock("services/fauna");

describe("API", () => {
  it("should bring products", async () => {
    const mockedFauna = jest.mocked(fauna);
    mockedFauna.query.mockResolvedValue([
      {
        data: {
          name: "Product 1",
          price: 100,
          description: "Product 1 description",
          image: "https://via.placeholder.com/150",
          id: "1",
        },
      },
    ]);

    const response = await queryAllProducts();

    expect(response).toBeDefined();
  });

  it("should stablish a proper connection with Fauna DB", () => {
    jest.unmock("services/fauna");

    expect(fauna.query).toBeDefined();
  });
});
