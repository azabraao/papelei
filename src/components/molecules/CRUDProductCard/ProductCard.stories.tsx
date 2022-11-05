import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import CRUDProductCard from "./index";
import { productsMock } from "__mocks__";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Molecules/CRUDProductCard",
  component: CRUDProductCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof CRUDProductCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CRUDProductCard> = () => (
  <CRUDProductCard {...productsMock[0]} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {};
