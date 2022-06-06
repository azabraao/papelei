import React, { memo } from "react";

interface AppCopyTitleProps {
  className?: string;
  children: React.ReactNode;
}

const Container = ({ children, className }: AppCopyTitleProps) => {
  return (
    <div className={`px-4 mx-auto max-w-6xl md:px-10 ${className}`}>
      {children}
    </div>
  );
};

export default memo(Container);
