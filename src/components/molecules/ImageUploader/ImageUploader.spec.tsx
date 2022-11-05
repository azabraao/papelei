import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import ImageUploader from "./index";

describe("ImageUploader", () => {
  it("should render", () => {
    expect(render(<ImageUploader onImageChange={console.log} />)).toBeTruthy();
  });
});
