import { memo, useCallback, useEffect, useRef, useState } from "react";
import { TextInput } from "components/molecules";
import {
  ArrowLeftIcon,
  Container,
  Portal,
  XSimpleIcon,
} from "components/atoms";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";
import NoProductsState from "./NoProductsState";
import ListProducts from "./ListProducts";
import { useSearch } from "contexts/search";

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
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
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
    <Container>
      <Portal onClick={closeSearch} />
      <div
        className={"fixed top-0 left-0 right-0 z-10"}
        data-testid="search-window"
      >
        <div className={"flex flex-col px-4 pt-11 pb-4 gap-1"}>
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
            IconRight={<XSimpleIcon />}
            autoFocus
            testid="search-input"
            ref={inputRef}
          />
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
    </Container>
  );
};

export default memo(SearchWindow);
