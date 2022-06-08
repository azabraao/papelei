import { memo } from "react";
import clsx from "clsx";

const XIcon = ({ theme }: IconProps) => {
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
        d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
        strokeWidth="1.5"
        strokeMiterlimit={10}
      />
      <path
        d="M15 9L9 15"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 15L9 9"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default memo(XIcon);
