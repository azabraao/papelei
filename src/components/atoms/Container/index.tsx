import React, { memo } from "react";

interface AppCopyTitleProps {
  className?: string;
  testid?: string;
  children: React.ReactNode;
}

const Container = ({ children, className, testid }: AppCopyTitleProps) => {
  return (
    <div
      {...(testid && { "data-testid": testid })}
      className={`px-4 mx-auto max-w-3xl md:px-10 w-full ${className}`}
    >
      {children}
    </div>
  );
};

Container.defaultProps = {
  className: "",
  testid: "",
};

export default memo(Container);
