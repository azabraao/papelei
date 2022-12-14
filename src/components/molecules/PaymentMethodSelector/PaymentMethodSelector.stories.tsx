import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import PaymentMethodSelector from "./index";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Molecules/PaymentMethodSelector",
  component: PaymentMethodSelector,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    label: { control: "text" },
    error: { control: "text" },
    isSuccess: { control: "boolean" },
  },
} as ComponentMeta<typeof PaymentMethodSelector>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof PaymentMethodSelector> = (args) => (
  <PaymentMethodSelector {...args} />
);

const defaultProps = {
  label: "Payment method",
  onMethodSelected: () => true,
};

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = defaultProps;
