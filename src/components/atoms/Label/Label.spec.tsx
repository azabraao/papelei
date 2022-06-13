import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Label from "./index";

describe("Label", () => {
  it("should render", () => {
    expect(render(<Label />)).toBeTruthy();
  });
});
