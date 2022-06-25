import { memo, useCallback, useEffect, useState } from "react";
import clsx from "clsx";

import { TrashIcon } from "components/atoms";
import { useCart } from "contexts/cart";
import { useProductCard } from "..";

const ButtonRemoveProductFromCart = () => {
  const [confirmRemoval, setConfirmRemoval] = useState<boolean>(false);
  const { code, restoreProductCard } = useProductCard();
  const { removeFromCart } = useCart();

  useEffect(() => {
    if (confirmRemoval) {
      setTimeout(() => {
        setConfirmRemoval(false);
      }, 4000);
    }
  }, [confirmRemoval]);

  const handleRemoval = useCallback(
    (event) => {
      event.stopPropagation();

      if (!confirmRemoval) return setConfirmRemoval(true);

      removeFromCart(code);
      restoreProductCard();
    },
    [confirmRemoval, code]
  );

  return (
    <button
      onClick={handleRemoval}
      className={clsx("py-2 flex justify-center gap-2", {
        "bg-danger-lighter text-danger": !confirmRemoval,
        "bg-danger text-white": confirmRemoval,
      })}
      data-testid="button-remove-product"
    >
      <TrashIcon />
      {confirmRemoval ? "Clique pra confirmar" : "Remover item"}
    </button>
  );
};

export default memo(ButtonRemoveProductFromCart);
