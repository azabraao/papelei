import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import TextArea from "./index";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Form/TextArea",
  component: TextArea,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    label: { control: "text" },
    error: { control: "text" },
    isSuccess: { control: "boolean" },
  },
} as ComponentMeta<typeof TextArea>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TextArea> = (args) => (
  <TextArea {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  label: "Name",
};

export const Error = Template.bind({});

Error.args = {
  label: "Name",
  error: "This field is required",
};

export const Success = Template.bind({});

Success.args = {
  label: "Name",
  isSuccess: true,
};
