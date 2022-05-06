import React from "react";
import { ReactSVG } from "react-svg";

import "./node.scss";

type NodeProps = {
  label: string;
  nodeId: string;
  isSelected: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactElement | React.ReactNode | null;
};

const Node: React.FC<NodeProps> = ({
  label,
  nodeId,
  isSelected,
  onClick,
  id,
  className = "",
  style,
  children,
}) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const onClickAction = (e: React.MouseEvent<HTMLDivElement>): void => {
    onClick && onClick(e);
    children && onExpanderClick();
  };

  const onExpanderClick = (): void => {
    setIsOpen((val) => !val);
  };

  React.useEffect(() => {
    if (!children) setIsOpen(false);
  }, [children]);

  return (
    <div id={id} className={`node ${className}`} style={style}>
      <div className={`node__info ${isSelected ? "node-selected" : ""}`}>
        {children && (
          <ReactSVG
            className={`node__expander-down ${!isOpen && "node__close"}`}
            src="/images/expander-down.react.svg"
            onClick={onExpanderClick}
          />
        )}
        <div data-id={nodeId} onClick={onClickAction}>
          {label}
        </div>
      </div>
      {isOpen && <div className="node__children">{children}</div>}
    </div>
  );
};

export default React.memo(Node);
