import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import Button from ".";

export default {
  title: "Components/Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});

Default.args = {
  label: "1",
  isDisabled: false,
  onClick: () => console.log("work"),
  id: "",
  className: "",
  style: {},
};
