import { memo, useCallback } from "react";
import clsx from "clsx";
import { useCart } from "contexts/cart";
import { useSearch } from "contexts/search";

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

  return (
    <div
      onClick={onProductClick}
      className={clsx(
        "flex p-4 text-black-70 items-center gap-6 w-full cursor-pointer",
        {
          "border border-b-[1px] border-t-0 border-x-0 border-black-20":
            isLastProduct,
        }
      )}
      data-testid="search-list-product"
    >
      <div>
        <img
          src={product.image}
          className="w-[91px] h-[91px] min-w-[91px]"
          alt={product.name}
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-lg">{product.name}</p>
        <p className="text-base">{product.price.sale.cash || "Sem preço"}</p>
      </div>
    </div>
  );
};

export default memo(SearchListProduct);
