/* eslint-disable react/display-name */
import clsx from "clsx";
import { useSearch } from "contexts/search";
import { forwardRef, memo } from "react";
import { Container, SearchIcon } from "..";

interface FloatingButtonProps {
  onClick: VoidFunction;
  testid?: string;
}

const FloatingButton = forwardRef(
  (
    { onClick, testid }: FloatingButtonProps,
    ref: React.Ref<HTMLButtonElement>
  ) => {
    const { searchIsOpen } = useSearch();

    return (
      <Container className="fixed z-10 right-4 bottom-20 flex justify-end mx-auto left-0  pointer-events-none">
        <button
          ref={ref}
          onClick={onClick}
          data-testid={testid}
          className={clsx(
            "bg-white relative rounded-full shadow-elevation-1 p-4 flex items-center transition-all pointer-events-auto ",
            {
              "right-0 justify-center w-[56px] h-[56px]": !searchIsOpen,
              "justify-end w-[200px] h-[40px] right-20": searchIsOpen,
            }
          )}
        >
          <SearchIcon />
        </button>
      </Container>
    );
  }
);

export default memo(FloatingButton);
