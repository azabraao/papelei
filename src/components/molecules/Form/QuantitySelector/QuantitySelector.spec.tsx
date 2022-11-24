import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import QuantitySelector from "./index";

const defaultProps = {
  label: "fake-label",
  placeholder: "fake-placeholder",
  onChange: jest.fn(),
  name: "fake-name",
  onValueChange: jest.fn(),
};

describe("QuantitySelector", () => {
  it("should render with label", () => {
    render(<QuantitySelector {...defaultProps} />);

    expect(screen.getByLabelText(defaultProps.label)).toBeInTheDocument();
  });

  it("should never have a value minor than 1", async () => {
    render(<QuantitySelector {...defaultProps} />);
    const input = screen.getByTestId("number-input");
    const decreaseButton = screen.getByTestId("decrease-button");

    fireEvent.change(input, { target: { value: "1" } });
    fireEvent.click(decreaseButton);
    fireEvent.click(decreaseButton);
    fireEvent.change(input, { target: { value: -20 } });
    fireEvent.blur(input);
    await waitFor(() => input);

    expect(input).toHaveValue(1);
  });

  it("should increase when clicking on increase button", () => {
    render(<QuantitySelector {...defaultProps} />);
    const input = screen.getByTestId("number-input");
    const increaseButton = screen.getByTestId("increase-button");

    fireEvent.click(increaseButton);
    expect(input).toHaveValue(2);

    fireEvent.click(increaseButton);
    expect(input).toHaveValue(3);
  });

  it("should decrease when clicking on decrease button", () => {
    render(<QuantitySelector {...defaultProps} initialValue={3} />);
    const input = screen.getByTestId("number-input");
    const decreaseButton = screen.getByTestId("decrease-button");

    fireEvent.click(decreaseButton);
    expect(input).toHaveValue(2);

    fireEvent.click(decreaseButton);
    expect(input).toHaveValue(1);

    fireEvent.click(decreaseButton);
    expect(input).toHaveValue(1);
  });

  it("should not allow letters", () => {
    render(<QuantitySelector {...defaultProps} initialValue={3} />);
    const input = screen.getByTestId("number-input");

    fireEvent.change(input, { target: { value: "a" } });
    fireEvent.blur(input);

    expect(input).toHaveValue(1);
  });

  it("should never be empty", () => {
    render(<QuantitySelector {...defaultProps} initialValue={3} />);
    const input = screen.getByTestId("number-input");

    fireEvent.change(input, { target: { value: "" } });
    fireEvent.blur(input);

    expect(input).toHaveValue(1);
  });
});
