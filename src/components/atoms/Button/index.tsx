import clsx from "clsx";
import React, { memo } from "react";

interface ButtonProps {
  backgroundColor?: string;
  label: string;
  fullWidth?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({
  fullWidth,
  onClick,
  backgroundColor,
  label,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "py-2 px-4 rounded-lg text-sm text-center transition-color duration-200",
        !disabled && "text-white",
        {
          "bg-success hover:bg-success-dark active:shadow-focus-shadow-success":
            backgroundColor === "success" && !disabled,
          "w-full": fullWidth,
          "cursor-not-allowed": disabled,
          "bg-black-20 text-black-70": disabled,
        }
      )}
      disabled={disabled}
      {...props}
    >
      {label}
    </button>
  );
};

Button.defaultProps = {
  backgroundColor: "success",
};

export default memo(Button);
