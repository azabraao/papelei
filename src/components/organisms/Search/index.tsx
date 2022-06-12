import { memo, useCallback } from "react";
import clsx from "clsx";
import { TextInput } from "components/molecules";
import { Portal, SearchIcon } from "components/atoms";
import LoadingState from "./components/LoadingState";
import ErrorState from "./components/ErrorState";
import NoProductsState from "./components/NoProductsState";
import ListProducts from "./components/ListProducts";
import { useSearch } from "contexts/search";

const Search = () => {
  const {
    performSearch,
    closeSearch,
    openSearch,
    shouldSearch,
    isLoading,
    isError,
    noProductsFound,
    searchResult,
  } = useSearch();

  const handleInputKeyDown = useCallback((event) => {
    if (event.key === "Escape") {
      closeSearch();
      event.target.blur();
    }
  }, []);

  const handleInputChange = useCallback(async (event) => {
    const value = event.target.value;
    performSearch(value);
  }, []);

  return (
    <>
      {shouldSearch && <Portal onClick={closeSearch} />}
      <div
        className={clsx(
          shouldSearch ? "fixed top-0 left-0 right-0 z-10" : "relative top-11"
        )}
        onFocus={openSearch}
        data-testid="search"
      >
        <div
          className={clsx(
            shouldSearch && "px-4 pt-11 pb-4 flex flex-col gap-1"
          )}
        >
          <TextInput
            label={!shouldSearch && "Do que você precisa?"}
            labelCentered
            name="search"
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            placeholder="Escreva o nome do produto"
            Icon={<SearchIcon theme="black-40" />}
          />
          {searchResult.length && shouldSearch ? (
            <ListProducts products={searchResult} />
          ) : isLoading ? (
            <LoadingState />
          ) : isError ? (
            <ErrorState />
          ) : noProductsFound ? (
            <NoProductsState />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default memo(Search);
