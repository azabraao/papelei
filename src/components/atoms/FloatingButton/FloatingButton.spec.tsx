import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import FloatingButton from "./index";

const onClick = jest.fn();

describe("FloatingButton", () => {
  it("should call onClick function passed in props", () => {
    render(
      <FloatingButton onClick={onClick} testid="floating-button">
        fake-children
      </FloatingButton>
    );

    const button = screen.getByTestId("floating-button");

    fireEvent.click(button);

    expect(onClick).toHaveBeenCalled();
  });
});
