import { memo, useCallback, useState } from "react";
import clsx from "clsx";
import { TextInput } from "components/molecules";
import { SearchIcon } from "components/atoms";

const Search = () => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  return (
    <div
      className={clsx(
        "transition-all duration-200",
        isFocused && "fixed top-0 left-0 right-0 z-10"
      )}
      onFocus={handleFocus}
      onBlur={handleBlur}
      data-testid="search"
    >
      <TextInput
        label="Do que você precisa?"
        labelCentered
        name="search"
        onChange={() => {
          return;
        }}
        placeholder="Escreva o nome do produto"
        Icon={<SearchIcon theme="black-40" />}
      />
    </div>
  );
};

export default memo(Search);
