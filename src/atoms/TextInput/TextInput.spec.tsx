import "@testing-library/jest-dom";
import { screen, render, waitFor } from "@testing-library/react";
import TextInput from "./index";

jest.mock("../../assets/icons/success/check.svg", () => {
  const ComponentToMock = () => <div />;
  return ComponentToMock;
});

jest.mock("../../assets/icons/danger/x.svg", () => {
  const ComponentToMock = () => <div />;
  return ComponentToMock;
});

const defaultProps = {
  label: "Name",
  placeholder: "Enter your name",
  onChange: jest.fn(),
};

describe("TextInput", () => {
  it("should render with label", () => {
    render(<TextInput {...defaultProps} />);

    expect(screen.getByTestId("input")).toBeTruthy();
  });
  it("should render with error", async () => {
    render(<TextInput {...defaultProps} error="Something happened" />);

    expect(screen.getByTestId("error-state")).toBeTruthy();
  });
  it("should render with success state", () => {
    render(<TextInput {...defaultProps} isSuccess={true} />);

    expect(screen.getByTestId("success-state")).toBeTruthy();
  });
});
