import clsx from "clsx";
import { useBudgetProposal } from "contexts/budgetProposal";
import { useCart } from "contexts/cart";
import { useCartScroll } from "contexts/cartScroll";
import { memo, useCallback, useEffect, useMemo } from "react";
import { vibrate } from "utils";
import { useProductCard } from "..";

interface ProductWrapProps {
  children: React.ReactNode;
}

const ProductWrap = ({ children }: ProductWrapProps) => {
  const { isValid, expandProductCard, isExpanded, isDraggingUp } =
    useProductCard();
  const { code } = useProductCard();
  const { shouldFinishBudget } = useBudgetProposal();
  const { cartProducts } = useCart();
  const { scrollTo } = useCartScroll();

  const isFirstInvalidItem = useMemo(() => {
    const invalidProducts = cartProducts.filter((item) => !item.isValid);

    const index = invalidProducts.findIndex((product) => product.code === code);

    return index === 0;
  }, [cartProducts]);

  useEffect(() => {
    if (shouldFinishBudget && !isValid && isFirstInvalidItem) {
      scrollTo(code);
      vibrate();
    }
  }, [shouldFinishBudget]);

  const handleClick = useCallback(() => {
    if (!isExpanded) expandProductCard();
  }, [isExpanded]);

  const hasError = useMemo(() => {
    return !isValid && shouldFinishBudget;
  }, [isValid, shouldFinishBudget]);

  return (
    <div
      onClick={handleClick}
      data-testid={isExpanded ? "product-card-expanded" : "product-card"}
      className={clsx(
        "scroll-mr-4 relative overflow-hidden z-20 rounded-lg flex flex-col text-black-70 cursor-pointer bg-white select-none",
        {
          "pointer-events-none": isDraggingUp,
          "min-w-[163px] w-40 gap-2": !isExpanded,
          "w-[300px] gap-4": isExpanded,
          "animate-shake ": hasError,
          "shadow-card-effect-danger": hasError,
          "shadow-card-effect-soft": !hasError,
        }
      )}
    >
      {children}
    </div>
  );
};

export default memo(ProductWrap);
