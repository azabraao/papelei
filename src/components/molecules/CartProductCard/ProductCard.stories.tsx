import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import CartProductCard from "./index";
import { productsMock } from "__mocks__";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Molecules/CartProductCard",
  component: CartProductCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof CartProductCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CartProductCard> = () => (
  <CartProductCard {...productsMock[0]} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {};
