import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Snackbar from "./index";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Atoms/Snackbar",
  component: Snackbar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Snackbar>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Snackbar> = (args) => {
  const [isActive, setIsActive] = useState<boolean>(true);

  return (
    <Snackbar
      {...args}
      isActive={isActive}
      onButtonClick={() => setIsActive(false)}
    />
  );
};

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  isActive: true,
  theme: "info",
  message: "This is a message",
  buttonMessage: "Action",
  onButtonClick: () => null,
};
