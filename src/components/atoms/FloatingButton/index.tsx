import { memo } from "react";
import { SearchIcon } from "..";

interface FloatingButtonProps {
  onClick: VoidFunction;
  testid?: string;
}

const FloatingButton = ({ onClick, testid }: FloatingButtonProps) => {
  return (
    <button
      onClick={onClick}
      data-testid={testid}
      className="fixed z-10 right-4 bottom-24 bg-white rounded-full shadow-elevation-1 p-4 flex justify-center items-center"
    >
      <SearchIcon />
    </button>
  );
};

export default memo(FloatingButton);
