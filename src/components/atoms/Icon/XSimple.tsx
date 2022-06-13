import { memo } from "react";
import clsx from "clsx";

const XSimpleIcon = ({ theme }: IconProps) => {
  return (
    <svg
      className={clsx("w-6 h-6 stroke-current", {
        "text-success": theme === "success",
        "text-danger": theme === "danger",
        "text-black-40": theme === "black-40",
      })}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.75 5.62695L5.25 19.127"
        stroke="#605F63"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.75 19.127L5.25 5.62695"
        stroke="#605F63"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default memo(XSimpleIcon);
