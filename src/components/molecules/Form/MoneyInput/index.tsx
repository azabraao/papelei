import { forwardRef, memo, useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import { maskMoney } from "utils";
import { withInputWrap } from "components/HOCs";

interface MoneyInputProps extends InputProps {
  initialValue?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  shouldReset?: boolean;
}

const MoneyInput = (
  {
    initialValue,
    name,
    error,
    isSuccess,
    placeholder,
    shouldReset,
    onChange,
    onBlur,
  }: MoneyInputProps,
  ref: React.Ref<HTMLInputElement>
) => {
  const [inputValue, setInputValue] = useState(initialValue || "0,00");

  useEffect(() => {
    if (shouldReset) setInputValue(null);
  }, [shouldReset]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    const { value } = e.target;
    setInputValue(maskMoney(value));
  }, []);

  return (
    <div
      className={clsx(
        "flex items-center justify-between bg-white rounded-lg border hover:shadow-on-hover-shadow focus-within:shadow-focus-shadow-info focus-within:border-info-300 placeholder-black-40 w-full overflow-hidden",
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
      <div className="bg-black-05 px-4 py-2 border-r-black-20 text-black-70 border border-y-0 border-l-0">
        R$
      </div>
      <input
        ref={ref}
        type="string"
        className="outline-none w-full text-black-70 h-6 px-4 py-2"
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={onBlur}
        name={name}
        id={name}
        value={inputValue}
      />
    </div>
  );
};

MoneyInput.defaultProps = {
  error: "",
  isSuccess: false,
  initialValue: "1,00",
  onBlur: () => null,
};

const InputWithRef = (Component) => {
  return withInputWrap<HTMLInputElement, MoneyInputProps>(
    forwardRef(Component)
  );
};

export default memo(InputWithRef(MoneyInput));
