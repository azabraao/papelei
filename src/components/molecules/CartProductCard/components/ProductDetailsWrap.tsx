import { memo } from "react";

interface ProductDetailsWrapProps {
  children: React.ReactNode;
}

const ProductDetailsWrap = ({ children }: ProductDetailsWrapProps) => {
  return <article className="flex flex-col gap-2 mb-1">{children}</article>;
};

export default memo(ProductDetailsWrap);
