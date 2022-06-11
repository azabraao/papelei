import clsx from "clsx";
import { memo } from "react";

interface CardProps {
  padding?: {
    y?: "none" | "xs" | "sm" | "md" | "lg";
    x?: "none" | "xs" | "sm" | "md" | "lg";
  };
  testId?: string;
  children: React.ReactNode;
}

const Card = ({ padding, testId, children }: CardProps) => {
  return (
    <div
      className={clsx(
        "shadow-elevation-1 rounded-lg bg-white overflow-hidden",
        padding.y === "none" && "py-0",
        padding.y === "xs" && "py-2",
        padding.y === "sm" && "py-4",
        padding.y === "md" && "py-6",
        padding.y === "lg" && "py-8",
        padding.x === "none" && "px-0",
        padding.x === "xs" && "px-2",
        padding.x === "sm" && "px-4",
        padding.x === "md" && "px-6",
        padding.x === "lg" && "px-8"
      )}
      data-testid={testId}
    >
      {children}
    </div>
  );
};

Card.defaultProps = {
  padding: {
    y: "sm",
    x: "sm",
  },
  testId: "",
};

export default memo(Card);
