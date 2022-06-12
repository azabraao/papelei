import React, {
  createContext,
  memo,
  useCallback,
  useContext,
  useState,
} from "react";
import { algolia } from "utils";

interface SearchContextValues {
  performSearch: (query: string) => void;
  closeSearch: () => void;
  openSearch: () => void;
  shouldSearch: boolean;
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
  const [shouldSearch, setShouldSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [noProductsFound, setNoProductsFound] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const openSearch = useCallback(() => {
    setShouldSearch(true);
  }, []);

  const closeSearch = useCallback(() => {
    setShouldSearch(false);
  }, []);

  const performSearch = useCallback(async (value) => {
    setIsLoading(true);

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
    <SearchContext.Provider
      value={{
        performSearch,
        closeSearch,
        openSearch,
        shouldSearch,
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
