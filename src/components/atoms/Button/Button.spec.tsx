import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Button from "./index";

const defaultProps = {
  backgroundColor: "success",
  children: <>Button</>,
};

describe("Button", () => {
  it("should render with label", () => {
    render(<Button {...defaultProps} />);

    expect(screen.getByText("Button")).toBeInTheDocument();
  });

  it("should call onClick function", () => {
    const onClick = jest.fn();
    render(<Button {...defaultProps} onClick={onClick} />);

    const button = screen.getByText("Button");

    fireEvent.click(button);

    expect(onClick).toHaveBeenCalled();
  });

  it("should render with fullWidth if fullWidth is true", () => {
    render(<Button {...defaultProps} fullWidth />);

    expect(screen.getByText("Button")).toHaveClass("w-full");
  });

  it("should render with fullWidth if fullWidth is true", () => {
    render(<Button {...defaultProps} />);

    expect(screen.getByText("Button")).not.toHaveClass("w-full");
  });

  it("should not be clickable if disabled", () => {
    const onClick = jest.fn();
    render(<Button {...defaultProps} disabled onClick={onClick} />);

    const button = screen.getByText("Button");

    fireEvent.click(button);

    expect(onClick).not.toHaveBeenCalled();
  });
});
