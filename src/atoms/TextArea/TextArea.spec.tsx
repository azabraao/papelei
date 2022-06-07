import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import TextArea from "./index";

jest.mock("../../assets/icons/success/check.svg", () => {
  const SVGMock = () => <div />;
  return SVGMock;
});

jest.mock("../../assets/icons/danger/x.svg", () => {
  const SVGMock = () => <div />;
  return SVGMock;
});

describe("TextArea", () => {
  it("should render with label", () => {
    render(
      <TextArea
        label="Name"
        name="name"
        onChange={jest.fn}
        placeholder="fake-placeholder"
      />
    );

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
  });
  it("should render with error message", () => {
    render(
      <TextArea
        label="Name"
        name="name"
        onChange={jest.fn}
        placeholder="fake-placeholder"
        error="fake-error"
      />
    );

    expect(screen.getByTestId("error-state")).toBeInTheDocument();
    expect(screen.getByText("fake-error")).toBeInTheDocument();
  });
  it("should render with success state", () => {
    render(
      <TextArea
        label="Name"
        name="name"
        onChange={jest.fn}
        placeholder="fake-placeholder"
        isSuccess={true}
      />
    );

    const inputWrap = screen.getByTestId("success-state");
    expect(inputWrap).toBeInTheDocument();
    expect(inputWrap).toHaveClass("border-success");
  });
  it("should render with placeholder", () => {
    render(
      <TextArea
        label="Name"
        name="name"
        onChange={jest.fn}
        placeholder="fake-placeholder"
        isSuccess={true}
      />
    );

    const inputWrap = screen.getByPlaceholderText("fake-placeholder");
    expect(inputWrap).toBeInTheDocument();
  });
  it("should render with onChange", () => {
    const onChange = jest.fn();

    render(
      <TextArea
        label="Name"
        name="name"
        onChange={onChange}
        placeholder="fake-placeholder"
        isSuccess={true}
      />
    );

    const input = screen.getByPlaceholderText("fake-placeholder");

    fireEvent.change(input, { target: { value: "fake-input-value" } });

    expect(input).toHaveValue("fake-input-value");
    expect(onChange).toHaveBeenCalled();
  });
});
