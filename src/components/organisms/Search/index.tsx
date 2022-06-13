import { memo } from "react";
import { useSearch } from "contexts/search";
import ButtonOpenSearch from "./components/ButtonOpenSearch";
import SearchWindow from "./components/SearchWindow";

const Search = () => {
  const { searchIsOpen } = useSearch();

  return searchIsOpen ? <SearchWindow /> : <ButtonOpenSearch />;
};

export default memo(Search);
