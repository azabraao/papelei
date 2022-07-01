import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Draggable from "@azabraao/react-draggable";
import clsx from "clsx";
import { useCallbackRef } from "use-callback-ref";

import { lockBodyScroll, unlockBodyScroll } from "utils";
import dynamic from "next/dynamic";
import Backdrop from "../Backdrop";

interface ModalBottomProps {
  children: React.ReactNode;
  closeModalBottom: VoidFunction;
  isOpen: boolean;
  testid?: string;
}

const ModalBottom = ({
  children,
  isOpen,
  closeModalBottom,
  testid,
}: ModalBottomProps) => {
  const [rect, setRect] = useState<DOMRect>(null);
  const ref = useCallbackRef(null, (ref) => {
    setRect(ref?.getBoundingClientRect());
  });

  useEffect(() => {
    if (isOpen) lockBodyScroll();
    else unlockBodyScroll();
  }, [isOpen]);

  const onDragging = useCallback(() => {
    ref.current.style.transition = "none";
  }, [ref]);

  const handleStopDragging = useCallback(
    (_, { y }) => {
      ref.current.style.transition = "transform 0.3s ease-in-out";

      const elementHeight = ref.current.offsetHeight;
      const elementHeightHalf = elementHeight / 2;
      const shouldClose = y > elementHeightHalf;

      if (shouldClose) closeModalBottom();
    },
    [ref]
  );

  const position = useMemo(() => {
    return {
      x: 0,
      y: isOpen ? 0 : rect?.height || 10000,
    };
  }, [isOpen, rect]);

  return (
    <div
      className={clsx(
        "fixed top-0 right-0 bottom-0 left-0 flex items-end justify-center z-20 transition-opacity",
        isOpen
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0 delay-300"
      )}
      data-testid={testid}
    >
      <Backdrop
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
        nodeRef={ref}
      >
        <div
          ref={ref}
          data-testid={`${testid}-children`}
          className="relative z-40 bg-white rounded-t-2xl pl-4 pr-4 max-h-screen flex flex-col"
        >
          <div className="flex justify-center items-center pt-4 pb-4">
            <div className="w-10 h-[2px] bg-black-40" />
          </div>
          <div className="overflow-y-auto scrollbar-none">{children}</div>
        </div>
      </Draggable>
    </div>
  );
};

ModalBottom.defaultProps = {
  testid: "",
};

export default memo(
  dynamic(() => Promise.resolve(ModalBottom), {
    ssr: false,
  })
);
