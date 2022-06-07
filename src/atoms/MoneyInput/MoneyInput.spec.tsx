import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import MoneyInput from "./index";

const defaultProps = {
  label: "Name",
  placeholder: "22,00",
  onChange: jest.fn(),
  name: "fake-name",
};

describe("MoneyInput", () => {
  it("should render with label", () => {
    render(<MoneyInput {...defaultProps} />);

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
  });

  it("should call onChange function when input changes", () => {
    const onChange = jest.fn();
    render(<MoneyInput {...defaultProps} onChange={onChange} />);
    const input = screen.getByPlaceholderText("22,00");

    fireEvent.change(input, { target: { value: "22.00" } });

    expect(onChange).toHaveBeenCalled();
  });

  it("should render with success state", () => {
    render(<MoneyInput {...defaultProps} isSuccess={true} />);

    const inputWrap = screen.getByTestId("success-state");
    expect(inputWrap).toBeInTheDocument();
    expect(inputWrap).toHaveClass("border-success");
  });

  it("should render with error message", () => {
    render(<MoneyInput {...defaultProps} error="fake-error" />);

    expect(screen.getByTestId("error-state")).toBeInTheDocument();
    expect(screen.getByText("fake-error")).toBeInTheDocument();
  });

  it("should display a number with two decimals", () => {
    render(<MoneyInput {...defaultProps} />);

    const input = screen.getByPlaceholderText("22,00");
    fireEvent.change(input, { target: { value: "22.00" } });

    expect(input).toHaveValue("22,00");
  });
});
