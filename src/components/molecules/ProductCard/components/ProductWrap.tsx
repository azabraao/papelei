import clsx from "clsx";
import { memo, useCallback } from "react";
import { useProductCard } from "..";

interface ProductWrapProps {
  children: React.ReactNode;
}

const ProductWrap = ({ children }: ProductWrapProps) => {
  const { error, expandProductCard, isExpanded, isDraggingUp } =
    useProductCard();

  const handleClick = useCallback(() => {
    if (!isExpanded) expandProductCard();
  }, [isExpanded]);

  return (
    <div
      onClick={handleClick}
      data-testid={isExpanded ? "product-card-expanded" : "product-card"}
      className={clsx(
        "relative overflow-hidden z-20 rounded-lg flex flex-col text-black-70 cursor-pointer bg-white select-none",
        {
          "pointer-events-none": isDraggingUp,
          "min-w-[163px] w-40 gap-2": !isExpanded,
          "w-[300px] gap-4": isExpanded,
          "animate-shake": error,
          "shadow-card-effect-danger": error,
          "shadow-card-effect-soft": !error,
        }
      )}
    >
      {children}
    </div>
  );
};

export default memo(ProductWrap);
