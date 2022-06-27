import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import ModalBottom from "./index";

describe("ModalBottom", () => {
  it("should render child", async () => {
    render(
      <ModalBottom isOpen={true} closeModalBottom={jest.fn}>
        <span data-testid="test-element" />
      </ModalBottom>
    );

    const element = await waitFor(() => screen.getByTestId("test-element"));
    expect(element).toBeInTheDocument();
  });
  // should be draggable
  // should close when dragged to bottom of the screen
  // should trigger dragg event
});
