import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import BottomBar from "./index";

describe("BottomBar", () => {
  it("should render", () => {
    expect(render(<BottomBar />)).toBeTruthy();
  });
});
