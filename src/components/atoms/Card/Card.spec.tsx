import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Card from "./index";

describe("Card", () => {
  it("should render", () => {
    expect(
      render(
        <Card>
          <p></p>
        </Card>
      )
    ).toBeTruthy();
  });
});
