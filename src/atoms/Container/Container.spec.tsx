import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Container from "./index";

describe("Container", () => {
  it("should render", () => {
    expect(
      render(
        <Container>
          <span />
        </Container>
      )
    ).toBeTruthy();
  });
  it("should render with a child", () => {
    render(
      <Container>
        <span data-testid="test-span" />
      </Container>
    );

    expect(screen.getByTestId("test-span")).toBeTruthy();
  });
});
