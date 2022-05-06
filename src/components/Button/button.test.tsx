import React from "react";

import { fireEvent, render, screen } from "@testing-library/react";

import Button from ".";

const defaultProps = {
  label: "Accept",
  isDisabled: false,
  onClick: () => console.log("work"),
  id: "123",
  className: "test",
  style: {},
};

it("Button has correct label", () => {
  render(<Button {...defaultProps} />);

  const buttonEl = screen.getByText(/Accept/i) as HTMLButtonElement;

  expect(buttonEl).toBeTruthy();
});

it("Button has correct class name", () => {
  render(<Button {...defaultProps} />);

  const buttonEl = screen.getByText(/Accept/i) as HTMLButtonElement;

  expect(buttonEl.classList.contains("button")).toBe(true);
  expect(buttonEl.classList.contains("test")).toBe(true);
});

it("Button has correct disabled state", () => {
  render(<Button {...defaultProps} isDisabled={true} />);

  const buttonEl = screen.getByText(/Accept/i) as HTMLButtonElement;

  expect(buttonEl.disabled).toBe(true);
});

it("Button has correct id", () => {
  render(<Button {...defaultProps} />);

  const buttonEl = screen.getByText(/Accept/i) as HTMLButtonElement;

  expect(buttonEl.id).toBe("123");
});
