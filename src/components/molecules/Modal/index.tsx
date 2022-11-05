import { XSimpleIcon } from "components/atoms";
import dynamic from "next/dynamic";

const SwipeToCloseModal = dynamic(() => import("react-swipe-to-close-modal"), {
  ssr: false,
});

interface DragUpToRemoveOrSwipeToCloseProps {
  isOpen: boolean;
  close: VoidFunction;
  children: React.ReactNode;
}

const Modal = ({
  isOpen,
  close,
  children,
}: DragUpToRemoveOrSwipeToCloseProps) => {
  return (
    <SwipeToCloseModal
      styles={{
        window: {
          wrap: {
            maxWidth: 400,
            borderRadius: 16,
          },
        },
      }}
      classNames={{
        modal: "p-4",
        window: {
          wrap: "shadow-card-effect-soft relative",
        },
      }}
      isOpen={isOpen}
      close={close}
    >
      <div
        className="pt-4 pr-3 pb-4 pl-4 absolute right-0 top-0 cursor-pointer"
        data-testid="x-close-modal"
        onClick={close}
      >
        <XSimpleIcon />
      </div>
      {children}
    </SwipeToCloseModal>
  );
};

export default Modal;
