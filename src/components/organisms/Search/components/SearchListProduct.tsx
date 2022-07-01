import { memo, useCallback, useMemo } from "react";
import clsx from "clsx";
import { useCart } from "contexts/cart";
import { useSearch } from "contexts/search";
import { ifSpaceBar, numberToMoney } from "utils";

interface SearchListProductProps {
  isLastProduct: boolean;
  product: Product;
}

const SearchListProduct = ({
  isLastProduct,
  product,
}: SearchListProductProps) => {
  const { addToCart } = useCart();
  const { closeSearch } = useSearch();

  const onProductClick = useCallback(() => {
    addToCart(product);
    closeSearch();
  }, []);

  const onKeyDown = useCallback((event) => {
    ifSpaceBar(event, onProductClick);
  }, []);

  const noPrice = useMemo(() => {
    return !product.price.sale.cash;
  }, []);

  return (
    <div
      onClick={onProductClick}
      onKeyDown={onKeyDown}
      tabIndex={0}
      className={clsx(
        "flex p-4 text-black-70 items-center gap-6 w-full cursor-pointer",
        {
          "border border-b-[1px] border-t-0 border-x-0 border-black-20":
            isLastProduct,
        }
      )}
      data-testid="search-result-item"
    >
      <div>
        <img
          src={product.image}
          className="w-[91px] h-[91px] min-w-[91px]"
          alt={product.name}
        />
      </div>
      <div className="flex flex-col gap-2">
        <p data-testid="search-result-item-name" className="text-lg">
          {product.name}
        </p>
        <p className="text-base">
          {noPrice ? "Sem preço" : numberToMoney(product.price.sale.deferred)}
        </p>
      </div>
    </div>
  );
};

export default memo(SearchListProduct);
