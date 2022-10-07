import { memo, useCallback, useState } from "react";
import clsx from "clsx";
import { CreditCardIcon, MoneyIcon } from "components/atoms";

interface PaymentMethodSelectorProps {
  label: string;
  onMethodSelected: (method: string) => void;
}

const PaymentMethodSelector = ({
  label,
  onMethodSelected,
}: PaymentMethodSelectorProps) => {
  const [activeMethod, setActiveMethod] = useState("cash");

  const onInCashClick = useCallback(() => {
    onMethodSelected("cash");
    setActiveMethod("cash");
  }, []);

  const onDeferredClick = useCallback(() => {
    onMethodSelected("deferred");
    setActiveMethod("deferred");
  }, []);

  return (
    <div className="flex gap-2 flex-col">
      <span className="text-black-70">{label}</span>
      <div className="flex flex-row gap-2">
        <button
          className={clsx(
            "flex items-center transition-colors gap-2 rounded-lg p-2 border text-black-70",
            activeMethod === "cash"
              ? "bg-info-50 border-info-300"
              : "border-black-20 bg-white"
          )}
          onClick={onInCashClick}
          data-testid="cash"
        >
          <MoneyIcon />
          <span>À vista</span>
        </button>
        <button
          className={clsx(
            "flex items-center transition-colors gap-2 rounded-lg p-2 border text-black-70",
            activeMethod === "deferred"
              ? "bg-info-50 border-info-300"
              : "border-black-20 bg-white"
          )}
          onClick={onDeferredClick}
          data-testid="deferred"
        >
          <CreditCardIcon />
          <span>À prazo</span>
        </button>
      </div>
    </div>
  );
};

export default memo(PaymentMethodSelector);
