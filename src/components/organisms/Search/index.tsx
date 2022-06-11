import { memo, useCallback, useState } from "react";
import clsx from "clsx";
import { TextInput } from "components/molecules";
import { Portal, SearchIcon } from "components/atoms";
import LoadingState from "./components/LoadingState";
import { algolia } from "utils";
import ErrorState from "./components/ErrorState";
import NoProductsState from "./components/NoProductsState";
import ListProducts from "./components/ListProducts";

const Search = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [noProductsFound, setNoProductsFound] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const closeSearch = useCallback(() => {
    setIsFocused(false);
  }, []);

  const handleInputChange = useCallback(async (event) => {
    setIsLoading(true);

    const value = event.target.value;
    try {
      const results = await algolia.search(value);
      setNoProductsFound(results.hits.length === 0);
      setSearchResult(results.hits);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      {isFocused && <Portal onClick={closeSearch} />}
      <div
        className={clsx(
          isFocused ? "fixed top-0 left-0 right-0 z-10" : "relative top-11"
        )}
        onFocus={handleFocus}
        data-testid="search"
      >
        <div
          className={clsx(isFocused && "px-4 pt-11 pb-4 flex flex-col gap-1")}
        >
          <TextInput
            label={!isFocused && "Do que você precisa?"}
            labelCentered
            name="search"
            onChange={handleInputChange}
            placeholder="Escreva o nome do produto"
            Icon={<SearchIcon theme="black-40" />}
          />
          {isLoading && <LoadingState />}
          {isError && <ErrorState />}
          {noProductsFound && <NoProductsState />}
          {searchResult.length && isFocused && (
            <ListProducts products={searchResult} />
          )}
        </div>
      </div>
    </>
  );
};

export default memo(Search);
