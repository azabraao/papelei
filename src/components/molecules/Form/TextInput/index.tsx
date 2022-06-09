import { memo, ReactNode } from "react";
import clsx from "clsx";
import { CheckedIcon, XIcon } from "components/atoms";
import { withInputWrap } from "components/HOCs";

interface TextInputProps extends InputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  Icon?: ReactNode;
}

const TextInput = ({
  name,
  error,
  isSuccess,
  Icon,
  placeholder,
  onChange,
}: TextInputProps) => {
  return (
    <div
      className={clsx(
        "flex items-center px-4 py-2 justify-between bg-white rounded-lg border hover:shadow-on-hover-shadow placeholder-black-40 w-full overflow-hidden",
        error &&
          "border-danger focus-within:border-danger focus-within:shadow-none",
        isSuccess &&
          "border-success focus-within:border-success focus-within:shadow-none",
        !error &&
          !isSuccess &&
          "border-black-20 focus-within:shadow-focus-shadow-info focus-within:border-info-light"
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

      {Icon && Icon}
      {error && <XIcon theme="danger" />}
      {isSuccess && <CheckedIcon theme="success" />}
    </div>
  );
};

TextInput.defaultProps = {
  error: "",
  isSuccess: false,
  labelCentered: false,
  labelSize: "base",
};

export default memo(withInputWrap(TextInput));
