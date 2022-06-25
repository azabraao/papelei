import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useCart } from "contexts/cart";
import Draggable from "@azabraao/react-draggable";
import clsx from "clsx";
import { useCartScroll } from "contexts/cartScroll";
import {
  getAxisOrientedOpacity,
  lockBodyScroll,
  stopPropagation,
  unlockBodyScroll,
} from "utils";
import { useProductCard } from "..";

interface DragUpToRemoveOrSwipeToCloseProps {
  children: React.ReactNode;
}

interface RemovalIndicatorProps {
  className?: string;
  children: React.ReactNode;
}

const RemovalIndicator = ({ className, children }: RemovalIndicatorProps) => {
  return (
    <div
      className={`transition-colors absolute border-2 border-dashed w-full h-full rounded-lg flex items-end justify-center text-xl pb-8 ${className}`}
    >
      {children}
    </div>
  );
};

const DragUpToRemoveOrSwipeToClose = ({
  children,
}: DragUpToRemoveOrSwipeToCloseProps) => {
  const { removeFromCart } = useCart();
  const { isScrolling } = useCartScroll();
  const {
    code,
    isExpanded,
    setIsDraggingUp,
    isDraggingUp,
    restoreProductCard,
  } = useProductCard();

  const [willRemove, setWillRemove] = useState(false);
  const [readyToRemove, setReadyToRemove] = useState(false);
  const [hasRemoved, setHasRemoved] = useState(false);

  useEffect(() => {
    if (hasRemoved) {
      setTimeout(() => {
        removeFromCart(code);
      }, 200);
    }
  }, [hasRemoved]);

  const onStartDragging = useCallback(() => {
    !isExpanded && setWillRemove(true);
  }, [isExpanded]);

  const onDragging = useCallback(
    (_, { y, x, node }) => {
      lockBodyScroll();

      if (isExpanded) {
        node.style.opacity = getAxisOrientedOpacity(x, y);
        return;
      }

      setIsDraggingUp(true);
      setReadyToRemove(y < -100);
    },
    [isExpanded]
  );

  const onStopDragging = useCallback(
    (_, { y, x, node }) => {
      const opacity = getAxisOrientedOpacity(x, y);
      const shouldRestoreProductCard = opacity < 0.4;
      node.style.opacity = 1;

      if (shouldRestoreProductCard && isExpanded) {
        return restoreProductCard();
      }

      if (isExpanded) return;

      setIsDraggingUp(false);
      if (y < -100) {
        setWillRemove(false);
        setHasRemoved(true);
      } else {
        setReadyToRemove(false);
        setWillRemove(false);
        setHasRemoved(false);
      }
    },
    [isExpanded]
  );

  const onTouchEnd = useCallback(() => {
    if (!isExpanded) unlockBodyScroll();
  }, [isExpanded]);

  const dragBounds = useMemo(() => {
    if (isExpanded) return {};

    if (isScrolling) return { bottom: 0, top: 0, left: 0, right: 0 };

    return { bottom: 0, left: 0, right: 0 };
  }, [isDraggingUp, isScrolling, isExpanded]);

  return (
    <div
      data-testid="drag-product-card"
      className="relative z-10"
      onTouchEnd={onTouchEnd}
      onScroll={stopPropagation}
      onTouchStart={stopPropagation}
    >
      {willRemove && !isExpanded && (
        <RemovalIndicator
          className={clsx({
            "border-danger text-danger": !readyToRemove,
            "bg-danger text-white ": readyToRemove,
          })}
        >
          Remover
        </RemovalIndicator>
      )}
      {hasRemoved && (
        <RemovalIndicator className="border-info text-info">
          Removido
        </RemovalIndicator>
      )}
      <Draggable
        onStart={onStartDragging}
        onDrag={onDragging}
        onStop={onStopDragging}
        bounds={dragBounds}
        // scale={0.5}
        position={{ x: 0, y: 0 }}
        // disabled={isScrolling || isAppleDevice()}
      >
        {children}
      </Draggable>
    </div>
  );
};

export default memo(DragUpToRemoveOrSwipeToClose);
