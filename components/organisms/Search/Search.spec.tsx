import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Search from "./index";

describe("Search", () => {
  it("should render", () => {
    expect(render(<Search />)).toBeTruthy();
  });
});
