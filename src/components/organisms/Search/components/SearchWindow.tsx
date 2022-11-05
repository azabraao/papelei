import { ArrowLeftIcon, Backdrop, XSimpleIcon } from "components/atoms";
import { TextInput } from "components/molecules";
import { useSearch } from "contexts/search";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { lockBodyScroll, unlockBodyScroll } from "utils";
import ErrorState from "./ErrorState";
import ListProducts from "./ListProducts";
import LoadingState from "./LoadingState";
import NoProductsState from "./NoProductsState";

const SearchWindow = () => {
  const {
    performSearch,
    closeSearch,
    searchIsOpen,
    isLoading,
    isError,
    noProductsFound,
    searchResult,
    clearSearchResults,
  } = useSearch();
  const inputRef = useRef(null);
  const [searchValue, setSearchValue] = useState<string | undefined>("");

  useEffect(() => {
    if (searchIsOpen) {
      lockBodyScroll();
    }

    return () => {
      unlockBodyScroll();
    };
  }, [searchIsOpen]);

  useEffect(() => {
    const shouldClearInput = !searchIsOpen;
    if (shouldClearInput) {
      clearSearchInput();
    }
  }, [searchIsOpen]);

  const clearSearchInput = useCallback(() => {
    setSearchValue("");
  }, []);

  const focusSearchInput = useCallback(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  const handleClearSearchInput = useCallback(() => {
    clearSearchInput();
    focusSearchInput();
    clearSearchResults();
  }, []);

  const handleInputKeyDown = useCallback((event) => {
    if (event.key === "Escape") {
      closeSearch();
      event.target.blur();
    }
  }, []);

  const handleInputChange = useCallback(async (event) => {
    const value = event.target.value;
    setSearchValue(value);
    performSearch(value);
  }, []);

  return (
    <div
      className={
        searchIsOpen
          ? "opacity-100 pointer-events-auto delay-100"
          : "opacity-0 pointer-events-none"
      }
      data-testid="search-window"
    >
      <Backdrop isActive={searchIsOpen} onClick={closeSearch} />
      <div className="fixed top-0 left-0 right-0 z-20 max-w-3xl mx-auto">
        <div className={"flex flex-col px-4 pt-11 pb-4 gap-1"}>
          {searchIsOpen && (
            <TextInput
              isControlled
              name="search"
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              value={searchValue}
              placeholder="Escreva o nome do produto"
              onIconRightClick={handleClearSearchInput}
              onIconLeftClick={closeSearch}
              IconLeft={<ArrowLeftIcon />}
              IconRight={searchValue ? <XSimpleIcon /> : undefined}
              autoFocus
              testid="search-input"
              ref={inputRef}
            />
          )}
          {searchResult.length ? (
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
    </div>
  );
};

export default memo(SearchWindow);
