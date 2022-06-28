import { memo } from "react";
import { Container, SearchIcon } from "..";

interface FloatingButtonProps {
  onClick: VoidFunction;
  testid?: string;
}

const FloatingButton = ({ onClick, testid }: FloatingButtonProps) => {
  return (
    <Container className="fixed z-10 right-4 bottom-24 flex justify-end mx-auto left-0">
      <button
        onClick={onClick}
        data-testid={testid}
        className="bg-white rounded-full shadow-elevation-1 p-4 flex justify-center items-center"
      >
        <SearchIcon />
      </button>
    </Container>
  );
};

export default memo(FloatingButton);
