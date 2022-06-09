import clsx from "clsx";
import { memo, useCallback, useState } from "react";
import { CreditCardIcon, MoneyIcon } from "components/atoms";

interface PaymentMethodSelectorProps {
  label: string;
  onMethodSelected: (method: string) => void;
}

const PaymentMethodSelector = ({
  label,
  onMethodSelected,
}: PaymentMethodSelectorProps) => {
  const [activeMethod, setActiveMethod] = useState("in-cash");

  const onInCashClick = useCallback(() => {
    onMethodSelected("in-cash");
    setActiveMethod("in-cash");
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
            activeMethod === "in-cash"
              ? "bg-info-lighter border-info-light"
              : "border-black-20"
          )}
          onClick={onInCashClick}
          data-testid="in-cash"
        >
          <MoneyIcon />
          <span>À vista</span>
        </button>
        <button
          className={clsx(
            "flex items-center transition-colors gap-2 rounded-lg p-2 border text-black-70",
            activeMethod === "deferred"
              ? "bg-info-lighter border-info-light"
              : "border-black-20"
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
