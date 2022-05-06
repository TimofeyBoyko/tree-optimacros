import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import Node from ".";

export default {
  title: "Components/Node",
  component: Node,
} as ComponentMeta<typeof Node>;

const Template: ComponentStory<typeof Node> = (args) => <Node {...args} />;

export const Default = Template.bind({});

Default.args = {
  label: "Test node",
  nodeId: "123",
  isSelected: false,
  onClick: (e: React.MouseEvent<HTMLDivElement>) => console.log(e),
  id: "",
  className: "",
  style: {},
  children: <div>123</div>,
};
