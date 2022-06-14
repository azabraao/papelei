import React, { memo } from "react";

interface AppCopyTitleProps {
  className?: string;
  children: React.ReactNode;
}

const Container = ({ children, className }: AppCopyTitleProps) => {
  return (
    <div className={`px-4 mx-auto max-w-6xl md:px-10 w-full ${className}`}>
      {children}
    </div>
  );
};

Container.defaultProps = {
  className: "",
};

export default memo(Container);
