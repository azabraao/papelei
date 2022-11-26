import MoneyInput from "components/molecules/Form/MoneyInput";
import { useCart } from "contexts/cart";
import { useProductPrice } from "hooks";
import { memo, useCallback, useState } from "react";
import { maskMoney } from "utils";
import { useProductCard } from "..";

const UpdatePriceInput = () => {
  const { code } = useProductCard();
  const { formattedPrice } = useProductPrice(code);
  const [error, setError] = useState<string>("");
  const { updateCartItemPrice } = useCart();

  const handlePriceChange = useCallback(
    (event) => {
      setError("");

      const { value } = event.target;

      const maskedNewPrice = maskMoney(value);

      const newPrice = maskedNewPrice.replaceAll(".", "").replaceAll(",", ".");

      if (newPrice === "" || isNaN(Number(newPrice))) return;

      updateCartItemPrice(code, Number(newPrice));
    },
    [code, updateCartItemPrice]
  );

  const handleInputBlur = useCallback((event) => {
    if (event.target.value.trim() === "") setError("Forneça um preço");
  }, []);

  return (
    <div className="ml-4 mr-4" data-testid="update-price-input">
      <MoneyInput
        name="price"
        placeholder=""
        onBlur={handleInputBlur}
        error={error}
        onChange={handlePriceChange}
        initialValue={formattedPrice}
        label="Mudar preço"
      />
    </div>
  );
};

export default memo(UpdatePriceInput);
