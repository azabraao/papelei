import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Portal from "./index";

describe("Portal", () => {
  it("should render fixed to the viewport", () => {
    render(<Portal isActive={true} />);

    expect(screen.getByTestId("portal")).toHaveClass(
      "bg-black-transparent absolute top-0 right-0 bottom-0 left-0"
    );
  });
});
