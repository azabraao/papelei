import clsx from "clsx";
import { Backdrop } from "components/atoms";
import { memo } from "react";
import { useProductCard } from "..";

interface ProductWindowProps {
  children: React.ReactNode;
}

const ProductWindow = ({ children }: ProductWindowProps) => {
  const { isExpanded, restoreProductCard } = useProductCard();

  return (
    <div
      className={clsx(
        isExpanded &&
          "fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center z-30 p-6"
      )}
    >
      <Backdrop
        isActive={isExpanded}
        onClick={() => {
          restoreProductCard();
        }}
      />

      {children}
    </div>
  );
};

export default memo(ProductWindow);
