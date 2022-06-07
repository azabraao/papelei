import { useState, memo, useCallback } from "react";
import clsx from "clsx";
import InputWrap from "../InputWrap";

interface QuantitySelectorProps {
  label: string;
  placeholder: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  isSuccess?: boolean;
  initialValue?: number;
}

const QuantitySelector = ({
  initialValue,
  name,
  error,
  isSuccess,
  label,
  onChange,
}: QuantitySelectorProps) => {
  const [inputValue, setInputValue] = useState<number>(initialValue);

  const increase = useCallback(() => {
    setInputValue(inputValue + 1);
  }, [inputValue]);

  const decrease = useCallback(() => {
    if (inputValue > 1) setInputValue(inputValue - 1);
  }, [inputValue]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    setInputValue(Number(e.target.value));
  }, []);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || Number(value) <= 0) setInputValue(1);
  }, []);

  return (
    <InputWrap name={name} error={error} label={label}>
      <div
        className={clsx(
          "max-w-[180px] flex items-center justify-between bg-white rounded-lg border hover:shadow-on-hover-shadow focus-within:shadow-focus-shadow focus-within:border-info-light placeholder-black-40 w-full overflow-hidden",
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
          className="py-2 px-4 outline-none"
          data-testid="decrease-button"
          onClick={decrease}
        >
          -
        </button>
        <input
          type="number"
          onChange={handleChange}
          onBlur={handleBlur}
          id={name}
          name={name}
          value={inputValue}
          data-testid="number-input"
          className="outline-none w-full text-black-70 h-auto py-2 px-4 text-center"
        />
        <button
          data-testid="increase-button"
          onClick={increase}
          className="py-2 px-4 outline-none"
        >
          +
        </button>
      </div>
    </InputWrap>
  );
};

QuantitySelector.defaultProps = {
  error: "",
  isSuccess: false,
  initialValue: 1,
};

export default memo(QuantitySelector);
