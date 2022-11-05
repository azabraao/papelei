import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Button from "./index";
import { GoogleIcon } from "..";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Atoms/Button",
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

const defaultProps = {
  backgroundColor: "success",
  children: <>Button</>,
};

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = defaultProps;

export const Iconic = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Iconic.args = {
  backgroundColor: "white",
  children: <>Continue with Google</>,
  icon: <GoogleIcon />,
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  ...defaultProps,
  fullWidth: true,
};
export const Disabled = Template.bind({});
Disabled.args = {
  ...defaultProps,
  disabled: true,
};
export const Transparent = Template.bind({});
Transparent.args = {
  ...defaultProps,
  backgroundColor: "white",
  icon: <GoogleIcon />,
};
