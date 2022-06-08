import { memo } from "react";
import { TextInput } from "components/molecules";
import { SearchIcon } from "components/atoms";

const Search = () => {
  return (
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
  );
};

export default memo(Search);
