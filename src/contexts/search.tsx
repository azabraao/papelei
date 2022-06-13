import React, {
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { algolia } from "utils";

interface SearchContextValues {
  performSearch: (query: string) => void;
  closeSearch: () => void;
  openSearch: () => void;
  clearSearchResults: () => void;
  searchIsOpen: boolean;
  isLoading: boolean;
  isError: boolean;
  noProductsFound: boolean;
  searchResult: Product[];
}

export const SearchContext = createContext({} as SearchContextValues);

interface SearchProps {
  children: React.ReactNode;
}

export const SearchProvider: React.FC<SearchProps> = ({ children }) => {
  const [searchIsOpen, setSearchIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [noProductsFound, setNoProductsFound] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<Product[]>([]);

  useEffect(() => {
    if (!searchIsOpen) {
      setNoProductsFound(false);
      setIsError(false);
      setSearchResult([]);
    }
  }, [searchIsOpen]);

  const clearSearchResults = useCallback(() => {
    setNoProductsFound(false);
    setIsError(false);
    setSearchResult([]);
  }, []);

  const openSearch = useCallback(() => {
    setSearchIsOpen(true);
  }, []);

  const closeSearch = useCallback(() => {
    setSearchIsOpen(false);
  }, []);

  const performSearch = useCallback(async (value) => {
    setIsLoading(true);

    try {
      const results = await algolia.search(value);
      setNoProductsFound(results.hits.length === 0);
      setSearchResult(results.hits as Product[]);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <SearchContext.Provider
      value={{
        performSearch,
        closeSearch,
        openSearch,
        clearSearchResults,
        searchIsOpen,
        isLoading,
        isError,
        noProductsFound,
        searchResult,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default memo(SearchProvider);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context)
    throw new Error("useSearch must be used within a SearchProvider");

  return context;
};
