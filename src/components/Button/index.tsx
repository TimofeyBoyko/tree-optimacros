import React from "react";

import "./button.scss";

type ButtonProps = {
  label?: string;
  isDisabled?: boolean;
  onClick?: () => void;
  id?: string;
  className?: string;
  style?: React.CSSProperties | undefined;
};

const Button: React.FC<ButtonProps> = ({
  label,
  isDisabled,
  onClick,
  id,
  className,
  style,
}) => {
  const onClickAction = () => {
    onClick && onClick();
  };

  return (
    <button
      id={id}
      className={`button ${className}`}
      style={style}
      disabled={isDisabled}
      onClick={onClickAction}
    >
      {label}
    </button>
  );
};

export default React.memo(Button);
