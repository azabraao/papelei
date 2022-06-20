import clsx from "clsx";
import { memo } from "react";
import { useProductCard } from "..";

interface ProductWrapProps {
  children: React.ReactNode;
}

const ProductWrap = ({ children }: ProductWrapProps) => {
  const { error } = useProductCard();

  return (
    <div
      data-testid="product-card"
      className={clsx(
        "relative z-20 min-w-[163px] w-40 p-4 rounded-lg flex flex-col gap-2 text-black-70 cursor-pointer bg-white select-none",
        {
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
