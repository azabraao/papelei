import { memo } from "react";
import ButtonOpenSearch from "./components/ButtonOpenSearch";
import SearchWindow from "./components/SearchWindow";

const Search = () => {
  return (
    <>
      <SearchWindow />
      <ButtonOpenSearch />
    </>
  );
};

export default memo(Search);
