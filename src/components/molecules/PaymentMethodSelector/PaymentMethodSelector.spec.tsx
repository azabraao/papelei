import "@testing-library/jest-dom";
import { screen, render, fireEvent } from "@testing-library/react";
import PaymentMethodSelector from "./index";

const defaultProps = {
  label: "Payment method",
  onMethodSelected: jest.fn(),
};

describe("PaymentMethodSelector", () => {
  it("should return two buttons with the texts à vista and à prazo", () => {
    const { getByText } = render(<PaymentMethodSelector {...defaultProps} />);
    expect(getByText("À vista")).toBeInTheDocument();
    expect(getByText("À prazo")).toBeInTheDocument();
  });

  it("should return the method name when the proper button is clicked", async () => {
    render(<PaymentMethodSelector {...defaultProps} />);
    const inCashButton = screen.getByTestId("cash");
    const deferredButton = screen.getByTestId("deferred");

    fireEvent.click(inCashButton);
    expect(defaultProps.onMethodSelected).toHaveBeenCalledWith("cash");

    fireEvent.click(deferredButton);
    expect(defaultProps.onMethodSelected).toHaveBeenCalledWith("deferred");
  });

  it("should visually change active button when clicked", async () => {
    render(<PaymentMethodSelector {...defaultProps} />);
    const inCashButton = screen.getByTestId("cash");
    const deferredButton = screen.getByTestId("deferred");

    fireEvent.click(screen.getByTestId("cash"));
    expect(inCashButton).toHaveClass("bg-info-lighter");
    expect(deferredButton).not.toHaveClass("bg-info-lighter");

    fireEvent.click(deferredButton);
    expect(deferredButton).toHaveClass("bg-info-lighter");
    expect(inCashButton).not.toHaveClass("bg-info-lighter");
  });
});
