import { useCart } from "contexts/cart";
import { memo, useEffect, useState } from "react";
import Draggable from "react-draggable";

interface DragUpToRemoveProps {
  children: React.ReactNode;
  productCode: string;
}

const DragUpToRemove = ({ productCode, children }: DragUpToRemoveProps) => {
  const { removeFromCart } = useCart();

  const [willRemove, setWillRemove] = useState(false);
  const [hasRemoved, setHasRemoved] = useState(false);

  useEffect(() => {
    if (hasRemoved) {
      setTimeout(() => {
        removeFromCart(productCode);
      }, 200);
    }
  }, [hasRemoved]);

  const onStartDraggingUp = () => {
    setWillRemove(true);
  };

  const onStopDraggingUp = (_, { y }) => {
    if (y < -200) {
      setWillRemove(false);
      setHasRemoved(true);
    } else {
      setWillRemove(false);
      setHasRemoved(false);
    }
  };

  return (
    <div className="relative z-10">
      {willRemove && (
        <div className="absolute border-2 border-danger border-dashed w-full h-full rounded-lg flex items-center justify-center text-danger text-xl">
          Remover
        </div>
      )}
      {hasRemoved && (
        <div className="absolute border-2 border-info border-dashed w-full h-full rounded-lg flex items-center justify-center text-info text-xl">
          Removido
        </div>
      )}
      <Draggable
        axis="y"
        onStart={onStartDraggingUp}
        onStop={onStopDraggingUp}
        bounds={{ bottom: 0 }}
        allowAnyClick={true}
      >
        {children}
      </Draggable>
    </div>
  );
};

export default memo(DragUpToRemove);
