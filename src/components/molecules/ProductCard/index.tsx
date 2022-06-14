import { memo, useCallback, useState } from "react";
import { QuantitySelector } from "components/molecules";
import { useCart } from "contexts/cart";
import { numberToMoney } from "utils";

const ProductCard = ({ code, image, name, price }: Product) => {
  const { updateCartItemQuantity } = useCart();

  const [itemValue, setItemValue] = useState<string>(price.sale.cash);

  const updateProductPriceShown = useCallback(
    (quantity: number) => {
      const moneyInNumber = Number(price.sale.cash);

      const newItemValue = moneyInNumber * quantity;

      setItemValue(newItemValue.toFixed(2));
    },
    [code]
  );

  const onQuantityChange = useCallback((quantity) => {
    updateProductPriceShown(quantity);
    updateCartItemQuantity(code, quantity);
  }, []);

  return (
    <div
      data-testid="product-card"
      className="min-w-[163px] w-40 shadow-card-effect-soft p-4 rounded-lg flex flex-col gap-2 text-black-70 cursor-pointer bg-white"
    >
      <img src={image} alt="Product" width={300} height={300} />
      <article className="flex flex-col gap-2 mb-1">
        <span>{name}</span>
        <h3 className="font-medium ">{numberToMoney(itemValue)}</h3>
      </article>
      <QuantitySelector
        name="quantity"
        onValueChange={onQuantityChange}
        placeholder="Qtd"
      />
    </div>
  );
};

export default memo(ProductCard);
