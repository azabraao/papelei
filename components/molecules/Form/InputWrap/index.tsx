import clsx from "clsx";
import { ReactNode, memo } from "react";

interface InputWrapProps {
  label?: string;
  name: string;
  error?: string;
  children: ReactNode;
  labelSize?: string;
  labelCentered?: boolean;
}

const InputWrap = ({
  labelSize,
  name,
  error,
  label,
  children,
  labelCentered,
}: InputWrapProps) => {
  return (
    <div className="flex gap-2 flex-col">
      {label && (
        <label
          htmlFor={name}
          className={clsx("text-black-70", {
            "text-base": labelSize === "base",
            "text-lg": labelSize === "lg",
            "text-center": labelCentered,
          })}
        >
          {label}
        </label>
      )}
      {children}
      {error && (
        <div className="text-danger text-xs">
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

InputWrap.defaultProps = {
  error: "",
  labelSize: "base",
  label: "",
};

export default memo(InputWrap);
