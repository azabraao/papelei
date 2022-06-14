import { useState, memo, useCallback, useEffect } from "react";
import clsx from "clsx";
import { withInputWrap } from "components/HOCs";

interface QuantitySelectorProps extends InputProps {
  initialValue?: number;
  value?: number;
  onValueChange: (value: number) => void;
}

const QuantitySelector = ({
  initialValue,
  name,
  error,
  isSuccess,
  disabled,
  value,
  onValueChange,
}: QuantitySelectorProps) => {
  const [inputValue, setInputValue] = useState<number>(initialValue);

  useEffect(() => {
    onValueChange(inputValue);
  }, [inputValue]);

  const increase = useCallback(() => {
    setInputValue(inputValue + 1);
  }, [inputValue]);

  const decrease = useCallback(() => {
    if (inputValue > 1) setInputValue(inputValue - 1);
  }, [inputValue]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(Number(e.target.value));
  }, []);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || Number(value) <= 0) setInputValue(1);
  }, []);

  return (
    <div
      className={clsx(
        "max-w-[180px] flex items-center justify-between rounded-lg border hover:shadow-on-hover-shadow focus-within:shadow-focus-shadow-info focus-within:border-info-light placeholder-black-40 w-full overflow-hidden",
        error &&
          "border-danger focus-within:border-danger focus-within:shadow-none",
        isSuccess &&
          "border-success focus-within:border-success focus-within:shadow-none",
        !error && !isSuccess && "border-black-20"
      )}
      data-testid={clsx(
        error && "error-state",
        isSuccess && "success-state",
        !error && !isSuccess && "input"
      )}
    >
      <button
        className={clsx("py-2 px-4 outline-none", {
          "text-black-70": !disabled,
          "text-black-40": disabled,
        })}
        data-testid="decrease-button"
        onClick={decrease}
        disabled={disabled}
      >
        -
      </button>
      <input
        type="number"
        onChange={handleChange}
        onBlur={handleBlur}
        id={name}
        name={name}
        value={disabled ? 0 : value || inputValue}
        data-testid="number-input"
        disabled={disabled}
        className={clsx("outline-none w-12 h-ful text-center bg-transparent", {
          "text-black-70": !disabled,
          "text-black-40": disabled,
        })}
      />
      <button
        data-testid="increase-button"
        onClick={increase}
        className={clsx("py-2 px-4 outline-none", {
          "text-black-70": !disabled,
          "text-black-40": disabled,
        })}
        disabled={disabled}
      >
        +
      </button>
    </div>
  );
};

QuantitySelector.defaultProps = {
  error: "",
  isSuccess: false,
  initialValue: 1,
  disabled: false,
  value: null,
  onValueChange: () => null,
};

export default memo(withInputWrap(QuantitySelector));
