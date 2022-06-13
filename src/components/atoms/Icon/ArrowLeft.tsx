import { memo } from "react";
import clsx from "clsx";

const ArrowLeftIcon = ({ theme }: IconProps) => {
  return (
    <svg
      className={clsx("w-6 h-6 stroke-current", {
        "text-success": theme === "success",
        "text-danger": theme === "danger",
        "text-black-40": theme === "black-40",
      })}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.25 12.377H3.75"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 5.62695L3.75 12.377L10.5 19.127"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default memo(ArrowLeftIcon);
