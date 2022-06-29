import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Backdrop from "./index";

describe("Backdrop", () => {
  it("should render fixed to the viewport", () => {
    render(<Backdrop isActive={true} />);

    expect(screen.getByTestId("backdrop")).toHaveClass(
      "bg-black-transparent absolute top-0 right-0 bottom-0 left-0"
    );
  });
});
