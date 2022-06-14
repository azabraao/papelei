import { memo } from "react";
import clsx from "clsx";
import { Label, SearchIcon } from "components/atoms";
import { useSearch } from "contexts/search";
import { useCart } from "contexts/cart";

const ButtonOpenSearch = () => {
  const { openSearch } = useSearch();
  const { cartIsEmpty } = useCart();

  return (
    <div onClick={openSearch} data-testid="button-open-search">
      <div className={clsx("flex flex-col px-4 py-2 gap-1")}>
        <Label
          label={
            cartIsEmpty ? "Do que você precisa?" : "Do que mais você precisa?"
          }
          labelCentered={cartIsEmpty}
          labelSize="lg"
        />
        <button className="px-4 py-2 flex items-center justify-between bg-white rounded-lg border hover:shadow-on-hover-shadow text-black-40 w-full overflow-hidden border-black-20 focus-within:shadow-focus-shadow-info focus-within:border-info-light">
          <span>Escreva o nome do produto</span>
          <SearchIcon theme="black-40" />
        </button>
      </div>
    </div>
  );
};

export default memo(ButtonOpenSearch);
