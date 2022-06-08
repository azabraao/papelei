import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Button from "./index";

const defaultProps = {
  backgroundColor: "success",
  label: "Button",
};

describe("Button", () => {
  it("should render with label", () => {
    render(<Button {...defaultProps} />);

    expect(screen.getByText(defaultProps.label)).toBeInTheDocument();
  });

  it("should call onClick function", () => {
    const onClick = jest.fn();
    render(<Button {...defaultProps} onClick={onClick} />);

    const button = screen.getByText(defaultProps.label);

    fireEvent.click(button);

    expect(onClick).toHaveBeenCalled();
  });

  it("should render with fullWidth if fullWidth is true", () => {
    render(<Button {...defaultProps} fullWidth />);

    expect(screen.getByText(defaultProps.label)).toHaveClass("w-full");
  });

  it("should render with fullWidth if fullWidth is true", () => {
    render(<Button {...defaultProps} />);

    expect(screen.getByText(defaultProps.label)).not.toHaveClass("w-full");
  });

  it("should not be clickable if disabled", () => {
    const onClick = jest.fn();
    render(<Button {...defaultProps} disabled onClick={onClick} />);

    const button = screen.getByText(defaultProps.label);

    fireEvent.click(button);

    expect(onClick).not.toHaveBeenCalled();
  });
});
