import { memo, useCallback, useEffect, useState } from "react";
import { useCart } from "contexts/cart";
import Draggable from "react-draggable";
import clsx from "clsx";

interface DragUpToRemoveProps {
  children: React.ReactNode;
  productCode: string;
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

const DragUpToRemove = ({ productCode, children }: DragUpToRemoveProps) => {
  const { removeFromCart } = useCart();

  const [willRemove, setWillRemove] = useState(false);
  const [readyToRemove, setReadyToRemove] = useState(false);
  const [hasRemoved, setHasRemoved] = useState(false);

  useEffect(() => {
    if (hasRemoved) {
      setTimeout(() => {
        removeFromCart(productCode);
      }, 200);
    }
  }, [hasRemoved]);

  const onStartDraggingUp = useCallback(() => {
    setWillRemove(true);
  }, []);

  const onDragingUp = useCallback((_, { y }) => {
    setReadyToRemove(y < -100);
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

  return (
    <div className="relative z-10">
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
        onDrag={onDragingUp}
        onStop={onStopDraggingUp}
        bounds={{ bottom: 0 }}
        position={{ x: 0, y: 0 }}
      >
        {children}
      </Draggable>
    </div>
  );
};

export default memo(DragUpToRemove);
