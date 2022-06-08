import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import MoneyInput from "./index";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Form/MoneyInput",
  component: MoneyInput,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    label: { control: "text" },
    error: { control: "text" },
    isSuccess: { control: "boolean" },
  },
} as ComponentMeta<typeof MoneyInput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof MoneyInput> = (args) => (
  <MoneyInput {...args} />
);

const defaultProps = {
  label: "Name",
  placeholder: "22,00",
  onChange: () => true,
  name: "fake-name",
};

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = defaultProps;

export const Error = Template.bind({});

Error.args = {
  ...defaultProps,
  error: "This field is required",
};

export const Success = Template.bind({});

Success.args = {
  ...defaultProps,
  isSuccess: true,
};
