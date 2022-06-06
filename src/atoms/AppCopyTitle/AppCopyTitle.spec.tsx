import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import AppCopyTitle from "./index";

describe("AppCopyTitle", () => {
  it("should render", () => {
    expect(render(<AppCopyTitle />)).toBeTruthy();
  });
});
