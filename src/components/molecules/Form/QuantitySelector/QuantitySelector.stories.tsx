import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import QuantitySelector from "./index";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Form/QuantitySelector",
  component: QuantitySelector,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    label: { control: "text" },
    error: { control: "text" },
    isSuccess: { control: "boolean" },
  },
} as ComponentMeta<typeof QuantitySelector>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof QuantitySelector> = (args) => (
  <QuantitySelector {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  label: "Quantity",
};

export const Disabled = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Disabled.args = {
  label: "Quantity",
  disabled: true,
};
