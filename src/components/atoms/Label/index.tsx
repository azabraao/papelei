import { memo } from "react";
import clsx from "clsx";

interface LabelProps {
  label: string;
  htmlFor?: string;
  labelSize?: string;
  labelCentered?: boolean;
}

const Label = ({ label, htmlFor, labelSize, labelCentered }: LabelProps) => {
  return (
    <label
      {...(htmlFor && { htmlFor })}
      className={clsx("text-black-70 w-full block", {
        "text-base": labelSize === "base",
        "text-lg": labelSize === "lg",
        "text-center": labelCentered,
      })}
    >
      {label}
    </label>
  );
};

Label.defaultProps = {
  labelSize: "base",
  labelCentered: false,
  htmlFor: "",
};

export default memo(Label);
