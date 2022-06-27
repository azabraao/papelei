import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ModalBottom from "./index";
import { BudgetProposalProvider } from "contexts/budgetProposal";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Atoms/ModalBottom",
  component: ModalBottom,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    isOpen: { control: "boolean" },
  },
} as ComponentMeta<typeof ModalBottom>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ModalBottom> = (args) => (
  <BudgetProposalProvider>
    <ModalBottom {...args} />
  </BudgetProposalProvider>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  isOpen: true,
  closeModalBottom: () => null,
  children: (
    <div>
      <div data-testid="test-element">Hello World</div>
      <div data-testid="test-element">Hello World</div>
      <div data-testid="test-element">Hello World</div>
      <div data-testid="test-element">Hello World</div>
      <div data-testid="test-element">Hello World</div>
      <div data-testid="test-element">Hello World</div>
      <div data-testid="test-element">Hello World</div>
    </div>
  ),
};
