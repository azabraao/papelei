import clsx from "clsx";
import React, { memo } from "react";

interface ButtonProps {
  backgroundColor?: string;
  children: React.ReactNode;
  fullWidth?: boolean;
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void | Promise<void>;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  testid?: string;
}

const Button = ({
  fullWidth,
  onClick,
  backgroundColor,
  disabled,
  children,
  type,
  className,
  testid,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        "py-2 px-4 rounded-lg text-sm text-center transition-color duration-200",
        !disabled && "text-white",
        {
          "bg-success hover:bg-success-dark active:shadow-focus-shadow-success":
            backgroundColor === "success" && !disabled,
          "bg-info hover:bg-info-dark active:shadow-focus-shadow-success":
            backgroundColor === "info" && !disabled,
          "bg-danger hover:bg-danger-dark active:shadow-focus-shadow-success":
            backgroundColor === "danger" && !disabled,
          "w-full": fullWidth,
          "cursor-not-allowed": disabled,
          "bg-black-20 text-black-70": disabled,
          [className]: className,
        }
      )}
      disabled={disabled}
      data-testid={testid}
      {...props}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  backgroundColor: "success",
  type: "button",
  className: "",
  testid: "",
};

export default memo(Button);
