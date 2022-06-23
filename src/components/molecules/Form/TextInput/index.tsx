/* eslint-disable react/display-name */
import { forwardRef, memo, ReactNode } from "react";
import clsx from "clsx";
import { CheckedIcon, XIcon } from "components/atoms";
import { withInputWrap } from "components/HOCs";

interface TextInputProps extends InputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onIconRightClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onIconLeftClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  autoFocus?: boolean;
  value?: string;
  IconRight?: ReactNode;
  IconLeft?: ReactNode;
  testid?: string;
}

const TextInput = forwardRef(
  (
    {
      name,
      error,
      isSuccess,
      IconLeft,
      IconRight,
      placeholder,
      value,
      isControlled,
      autoFocus,
      testid,
      onKeyDown,
      onChange,
      onIconRightClick,
      onIconLeftClick,
    }: TextInputProps,
    ref: React.Ref<HTMLInputElement>
  ) => {
    return (
      <div
        className={clsx(
          "flex items-stretch justify-between bg-white rounded-lg border hover:shadow-on-hover-shadow placeholder-black-40 w-full overflow-hidden",
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
        {IconLeft && (
          <div className="px-4 py-2" onClick={onIconLeftClick}>
            {IconLeft}
          </div>
        )}
        <input
          type="text"
          className={clsx("outline-none w-full text-black-70", {
            "px-4 py-2": !IconLeft,
          })}
          placeholder={placeholder}
          onChange={onChange}
          onKeyDown={onKeyDown}
          name={name}
          ref={ref}
          id={name}
          {...(testid && { "data-testid": testid })}
          {...(isControlled && { value })}
          autoComplete="off"
          autoFocus={autoFocus}
        />

        <div
          className={clsx({ "px-4 py-2": IconLeft || IconRight || isSuccess })}
          onClick={onIconRightClick}
        >
          {IconRight && IconRight}
          {error && <XIcon theme="danger" />}
          {isSuccess && <CheckedIcon theme="success" />}
        </div>
      </div>
    );
  }
);

TextInput.defaultProps = {
  error: "",
  isSuccess: false,
  labelCentered: false,
  labelSize: "base",
  IconRight: null,
  IconLeft: null,
  autoFocus: false,
  value: null,
  onKeyDown: () => null,
  onIconLeftClick: () => null,
  onIconRightClick: () => null,
  testid: "",
};

export default memo(withInputWrap(TextInput));
