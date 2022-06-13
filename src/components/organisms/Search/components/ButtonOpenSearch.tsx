import { memo } from "react";
import clsx from "clsx";
import { Label, SearchIcon } from "components/atoms";
import { useSearch } from "contexts/search";

const ButtonOpenSearch = () => {
  const { openSearch } = useSearch();

  return (
    <div onClick={openSearch} data-testid="button-open-search">
      <div className={clsx("flex flex-col px-4 pt-11 pb-4 gap-1")}>
        <Label label={"Do que você precisa?"} labelCentered labelSize="lg" />
        <button className="px-4 py-2 flex items-center justify-between bg-white rounded-lg border hover:shadow-on-hover-shadow text-black-40 w-full overflow-hidden border-black-20 focus-within:shadow-focus-shadow-info focus-within:border-info-light">
          <span>Escreva o nome do produto</span>
          <SearchIcon theme="black-40" />
        </button>
      </div>
    </div>
  );
};

export default memo(ButtonOpenSearch);
