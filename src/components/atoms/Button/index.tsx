import clsx from "clsx";
import React, { memo } from "react";

interface ButtonProps {
  backgroundColor?: "success" | "info" | "danger" | "white";
  children: React.ReactNode;
  fullWidth?: boolean;
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void | Promise<void>;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  testid?: string;
  icon?: React.ReactNode;
  isRounded?: boolean;
  withShadow?: boolean;
}

const Button = (
  {
    fullWidth,
    onClick,
    backgroundColor,
    disabled,
    children,
    type,
    className,
    testid,
    icon,
    withShadow,
    isRounded,
    ...props
  }: ButtonProps,
  ref
) => {
  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      className={clsx(
        "py-2 px-4 text-sm transition-color duration-200 flex",
        icon ? "gap-4 items-center" : "justify-center",
        isRounded ? "rounded-full" : "rounded-lg",
        {
          "bg-success text-white hover:bg-success-700 active:shadow-focus-shadow-success":
            backgroundColor === "success" && !disabled,
          "bg-info text-white hover:bg-info-700 active:shadow-focus-shadow-success":
            backgroundColor === "info" && !disabled,
          "bg-danger text-white hover:bg-danger-700 active:shadow-focus-shadow-success":
            backgroundColor === "danger" && !disabled,
          "bg-white text-gray-700 active:shadow-focus-shadow-success":
            backgroundColor === "white" && !disabled,
          "shadow-elevation-1": withShadow,
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
      <div>{icon}</div>
      {children}
    </button>
  );
};

Button.defaultProps = {
  backgroundColor: "success",
  type: "button",
  className: "",
  testid: "",
  isRounded: false,
};

const ButtonWithRef = (Component) => {
  return React.forwardRef<HTMLButtonElement, ButtonProps>(Component);
};

export default memo(ButtonWithRef(Button));
