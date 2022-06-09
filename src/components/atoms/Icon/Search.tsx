import { memo } from "react";
import clsx from "clsx";

const SearchIcon = ({ theme }: IconProps) => {
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
        d="M10.875 19.1271C15.2242 19.1271 18.75 15.6014 18.75 11.2521C18.75 6.90289 15.2242 3.37714 10.875 3.37714C6.52576 3.37714 3 6.90289 3 11.2521C3 15.6014 6.52576 19.1271 10.875 19.1271Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.4437 16.8209L21 21.3771"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default memo(SearchIcon);
