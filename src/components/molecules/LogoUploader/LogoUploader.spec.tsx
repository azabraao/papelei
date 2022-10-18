import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import LogoUploader from "./index";

describe("LogoUploader", () => {
  it("should render", () => {
    expect(render(<LogoUploader />)).toBeTruthy();
  });
});
