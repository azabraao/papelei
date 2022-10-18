import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import LogoutButton from "./index";

describe("LogoutButton", () => {
  it("should render", () => {
    expect(render(<LogoutButton />)).toBeTruthy();
  });
});
