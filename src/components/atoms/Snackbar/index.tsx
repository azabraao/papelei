import clsx from "clsx";
import { memo } from "react";

interface SnackbarProps {
  isActive: boolean;
  theme: theme;
  message: string;
  buttonMessage: string;
  onButtonClick: VoidFunction;
}

const Snackbar = ({
  isActive,
  theme,
  message,
  buttonMessage,
  onButtonClick,
}: SnackbarProps) => {
  return (
    <div
      className={clsx(
        "fixed transition-all flex items-center rounded-lg ml-auto mr-auto right-0 left-0 w-fit",
        theme === "info" && "bg-blue-900 text-white",
        isActive ? "bottom-20" : "-bottom-20"
      )}
    >
      <div className="py-2 px-4 h-full border-r-black-40 border-r-2">
        {message}
      </div>
      <button
        onClick={onButtonClick}
        className="py-2 px-4 font-bold border-0 border-none"
      >
        {buttonMessage}
      </button>
    </div>
  );
};

export default memo(Snackbar);
