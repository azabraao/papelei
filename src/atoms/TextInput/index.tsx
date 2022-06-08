import { memo } from "react";
import clsx from "clsx";
import CheckIcon from "../../assets/icons/success/check.svg";
import XIcon from "../../assets/icons/danger/x.svg";
import InputWrap from "../InputWrap";

interface Props {
  label: string;
  name: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  isSuccess?: boolean;
}

const TextInput = ({
  name,
  error,
  isSuccess,
  label,
  placeholder,
  onChange,
}: Props) => {
  return (
    <InputWrap name={name} error={error} label={label}>
      <div
        className={clsx(
          "flex items-center px-4 py-2 justify-between bg-white border-black-20 rounded-lg border hover:shadow-on-hover-shadow focus-within:shadow-focus-shadow focus-within:border-info-light placeholder-black-40 w-full overflow-hidden",
          error &&
            "border-danger focus-within:border-danger focus-within:shadow-none",
          isSuccess &&
            "border-success focus-within:border-success focus-within:shadow-none"
        )}
        data-testid={clsx(
          error && "error-state",
          isSuccess && "success-state",
          !error && !isSuccess && "input"
        )}
      >
        <input
          type="text"
          className="outline-none w-full text-black-70 h-6"
          placeholder={placeholder}
          onChange={onChange}
          name={name}
          id={name}
        />

        {error && <XIcon className="transition-transform" />}
        {isSuccess && <CheckIcon />}
      </div>
    </InputWrap>
  );
};

TextInput.defaultProps = {
  error: "",
  isSuccess: false,
};

export default memo(TextInput);
