import { memo, useCallback, useEffect, useState } from "react";
import { useCart } from "contexts/cart";
import Draggable from "@azabraao/react-draggable";
import clsx from "clsx";
import { useCartScroll } from "contexts/cartScroll";
import { isAppleDevice, lockBodyScroll, unlockBodyScroll } from "utils";
import { useProductCard } from "..";

interface DragUpToRemoveProps {
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

const DragUpToRemove = ({ children }: DragUpToRemoveProps) => {
  const { removeFromCart } = useCart();
  const { isScrolling } = useCartScroll();
  const { code } = useProductCard();

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

  const onStartDraggingUp = useCallback(() => {
    setWillRemove(true);
  }, []);

  const onDraggingUp = useCallback((_, { y }) => {
    setReadyToRemove(y < -100);
    lockBodyScroll();
  }, []);

  const onStopDraggingUp = useCallback((_, { y }) => {
    if (y < -100) {
      setWillRemove(false);
      setHasRemoved(true);
    } else {
      setReadyToRemove(false);
      setWillRemove(false);
      setHasRemoved(false);
    }
  }, []);

  const onTouchEnd = useCallback(() => {
    unlockBodyScroll();
  }, []);

  return (
    <div className="relative z-10" onTouchEnd={onTouchEnd}>
      {willRemove && (
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
        axis="y"
        onStart={onStartDraggingUp}
        onDrag={onDraggingUp}
        onStop={onStopDraggingUp}
        bounds={{ bottom: 0, top: isScrolling ? 0 : undefined }}
        position={{ x: 0, y: 0 }}
        disabled={isScrolling || isAppleDevice()}
      >
        {children}
      </Draggable>
    </div>
  );
};

export default memo(DragUpToRemove);
