import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Search from "./index";
import { SearchProvider } from "contexts/search";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Organisms/Search",
  component: Search,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    label: { control: "text" },
    error: { control: "text" },
    isSuccess: { control: "boolean" },
  },
} as ComponentMeta<typeof Search>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Search> = () => (
  <SearchProvider>
    <Search />
  </SearchProvider>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {};
