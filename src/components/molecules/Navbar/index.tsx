import clsx from "clsx";
import { useCart } from "contexts/cart";
import { memo } from "react";
import { numberToMoney } from "utils";

const Navbar = () => {
  const { cartIsEmpty, cartTotal } = useCart();

  return (
    <div
      className={clsx(
        "bg-blue-900 w-full flex items-center shadow-elevation-1",
        cartIsEmpty ? "p-4 justify-center" : "px-4 py-2 justify-between"
      )}
    >
      <img src="./budget-generator.svg" alt="AMD Gesso" />
      {!cartIsEmpty && (
        <article className="text-white">
          <p className="text-xs">Total</p>
          <p data-testid="budget-total-value" className="text-base">
            {numberToMoney(cartTotal)}
          </p>
        </article>
      )}
    </div>
  );
};

export default memo(Navbar);
