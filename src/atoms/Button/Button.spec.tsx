import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { Button } from "./index";

describe("Button", () => {
  it("should render", () => {
    expect(render(<Button primary={true} label="Button" />)).toBeTruthy();
  });
});
