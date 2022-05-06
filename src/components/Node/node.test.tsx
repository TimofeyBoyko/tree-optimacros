import React from "react";

import { fireEvent, render, screen } from "@testing-library/react";

import Node from ".";

const onClickDefault = (e: React.MouseEvent<HTMLDivElement>): void => {
  console.log(e);
};

const defaultProps = {
  label: "Test node",
  nodeId: "123",
  isSelected: false,
  onClick: onClickDefault,
  id: "",
  className: "",
  style: {},
  children: null,
};

it("Node has correct label", () => {
  render(<Node {...defaultProps} />);

  const nodeEl = screen.getByText(/Test node/i);

  expect(nodeEl).toBeTruthy();
});
