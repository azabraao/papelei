import { memo, useCallback, useEffect, useMemo, useRef } from "react";
import Draggable from "@azabraao/react-draggable";
import clsx from "clsx";
import { lockBodyScroll, unlockBodyScroll } from "utils";
import dynamic from "next/dynamic";
import Portal from "../Portal";

interface ModalBottomProps {
  children: React.ReactNode;
  closeModalBottom: VoidFunction;
  isOpen: boolean;
}

const ModalBottom = ({
  children,
  isOpen,
  closeModalBottom,
}: ModalBottomProps) => {
  const draggableElement = useRef(null);

  useEffect(() => {
    if (isOpen) lockBodyScroll();
    else unlockBodyScroll();
  }, [isOpen]);

  const onDragging = useCallback(() => {
    draggableElement.current.style.transition = "none";
  }, [draggableElement]);

  const handleStopDragging = useCallback(
    (_, { y }) => {
      draggableElement.current.style.transition = "transform 0.3s ease-in-out";

      const elementHeight = draggableElement.current.offsetHeight;
      const elementHeightHalf = elementHeight / 2;
      const shouldClose = y > elementHeightHalf;

      if (shouldClose) closeModalBottom();
    },
    [draggableElement]
  );

  const position = useMemo(() => {
    return {
      x: 0,
      y: isOpen ? 0 : window.innerHeight,
    };
  }, [isOpen]);

  return (
    <div
      className={clsx(
        "fixed top-0 right-0 bottom-0 left-0 flex items-end justify-center z-20 duration-1000 transition-transform ease-in-out",
        isOpen ? " pointer-events-auto" : " pointer-events-none "
      )}
    >
      <Portal
        isActive={isOpen}
        onClick={closeModalBottom}
        transitionDuration={500}
      />
      <Draggable
        axis="y"
        bounds={{
          top: 0,
        }}
        position={position}
        defaultClassName={clsx(
          "w-full max-w-6xl transition-transform duration-300 ease-in-out"
        )}
        onStop={handleStopDragging}
        onDrag={onDragging}
        nodeRef={draggableElement}
      >
        <div
          ref={draggableElement}
          className="relative z-40 bg-white rounded-t-2xl pl-4 pr-4"
        >
          <div className="flex justify-center items-center pt-4 pb-4">
            <div className="w-10 h-[2px] bg-black-40" />
          </div>
          {children}
        </div>
      </Draggable>
    </div>
  );
};

export default memo(
  dynamic(() => Promise.resolve(ModalBottom), {
    ssr: false,
  })
);
