import { memo, useState } from "react";
import clsx from "clsx";
import { maskMoney } from "../../../utils";
import InputWrap from "../InputWrap";

interface Props {
  label: string;
  name: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  isSuccess?: boolean;
  initialValue?: string;
}

const MoneyInput = ({
  initialValue,
  name,
  error,
  isSuccess,
  label,
  placeholder,
  onChange,
}: Props) => {
  const [inputValue, setInputValue] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    const { value } = e.target;
    setInputValue(maskMoney(value));
  };

  return (
    <InputWrap label={label} name={name} error={error}>
      <div
        className={clsx(
          "flex items-center justify-between max-w-[180px] bg-white rounded-lg border hover:shadow-on-hover-shadow focus-within:shadow-focus-shadow focus-within:border-info-light placeholder-black-40 w-full overflow-hidden",
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
          type="string"
          className="outline-none w-full text-black-70 h-6 px-4 py-2"
          placeholder={placeholder}
          onChange={handleChange}
          name={name}
          id={name}
          value={inputValue}
        />
      </div>
    </InputWrap>
  );
};

MoneyInput.defaultProps = {
  error: "",
  isSuccess: false,
  initialValue: "1,00",
};

export default memo(MoneyInput);
