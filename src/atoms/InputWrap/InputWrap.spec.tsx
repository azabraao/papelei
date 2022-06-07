import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import InputWrap from "./index";

const defaultProps = {
  label: "Name",
  name: "fake-name",
};

describe("InputWrap", () => {
  it("should render with label", () => {
    render(
      <InputWrap {...defaultProps}>
        <input id={defaultProps.name} />
      </InputWrap>
    );

    expect(screen.getByLabelText(defaultProps.label)).toBeInTheDocument();
  });
});
