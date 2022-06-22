import { memo } from "react";
import clsx from "clsx";

const TrashIcon = ({ theme }: IconProps) => {
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
        d="M20.25 5.75H3.75"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.75 10.25V16.25"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.25 10.25V16.25"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.75 5.75V20C18.75 20.1989 18.671 20.3897 18.5303 20.5303C18.3897 20.671 18.1989 20.75 18 20.75H6C5.80109 20.75 5.61032 20.671 5.46967 20.5303C5.32902 20.3897 5.25 20.1989 5.25 20V5.75"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.75 5.75V4.25C15.75 3.85218 15.592 3.47064 15.3107 3.18934C15.0294 2.90804 14.6478 2.75 14.25 2.75H9.75C9.35218 2.75 8.97064 2.90804 8.68934 3.18934C8.40804 3.47064 8.25 3.85218 8.25 4.25V5.75"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default memo(TrashIcon);
