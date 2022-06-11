import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Portal from "./index";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Atoms/Portal",
  component: Portal,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    label: { control: "text" },
    error: { control: "text" },
    isSuccess: { control: "boolean" },
  },
} as ComponentMeta<typeof Portal>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Portal> = (args) => <Portal {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {};
