import { memo, useCallback, useMemo } from "react";
import { QuantitySelector } from "components/molecules";
import { useCart, useCartItem } from "contexts/cart";
import clsx from "clsx";
import DragUpToRemove from "./components/DragUpToRemove";
import { useProductPrice } from "hooks";

interface ProductCardProps extends Product {
  error?: boolean;
}

const ProductCard = ({ code, image, name, error }: ProductCardProps) => {
  const { updateCartItemQuantity } = useCart();
  const { quantity } = useCartItem(code);
  const { formattedPrice, noPrice } = useProductPrice(code);

  const onQuantityChange = useCallback((quantity) => {
    updateCartItemQuantity(code, quantity);
  }, []);

  const priceShown = useMemo(() => {
    if (error && noPrice) return "Defina um preço";

    if (noPrice) return "Sem preço";

    return formattedPrice;
  }, [error, noPrice, formattedPrice]);

  return (
    <DragUpToRemove productCode={code}>
      <div
        data-testid="product-card"
        className={clsx(
          "relative z-20 min-w-[163px] w-40 p-4 rounded-lg flex flex-col gap-2 text-black-70 cursor-pointer bg-white",
          {
            "animate-shake": error,
            "shadow-card-effect-danger": error,
            "shadow-card-effect-soft": !error,
          }
        )}
      >
        <img src={image} alt="Product" width={300} height={300} />
        <article className="flex flex-col gap-2 mb-1">
          <div className="flex items-center min-h-[48px]">
            <span className="webkit-box line-clamp-2 box-orient-vertical text-ellipsis overflow-hidden  ">
              {name}
            </span>
          </div>
          <h3
            className={clsx("font-medium ", {
              "text-danger": noPrice,
            })}
          >
            {priceShown}
          </h3>
        </article>
        <QuantitySelector
          name="quantity"
          onValueChange={onQuantityChange}
          placeholder="Qtd"
          value={quantity}
          disabled={noPrice}
        />
      </div>
    </DragUpToRemove>
  );
};

ProductCard.defaultProps = {
  error: false,
};

export default memo(ProductCard);
