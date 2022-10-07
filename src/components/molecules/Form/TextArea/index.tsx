/* eslint-disable react/display-name */
import { forwardRef, memo } from "react";
import clsx from "clsx";
import TextareaAutosize from "react-textarea-autosize";
import { CheckedIcon, XIcon } from "components/atoms";
import { withInputWrap } from "components/HOCs";

interface TextAreaProps extends InputProps {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea = forwardRef(
  (
    { name, error, isSuccess, placeholder, onChange }: TextAreaProps,
    ref: React.Ref<HTMLTextAreaElement>
  ) => {
    return (
      <div
        className={clsx(
          "flex items-start px-4 py-2 justify-between bg-white rounded-lg border hover:shadow-on-hover-shadow placeholder-black-40 w-full overflow-hidden",
          error &&
            "border-danger focus-within:border-danger focus-within:shadow-none",
          isSuccess &&
            "border-success focus-within:border-success focus-within:shadow-none",
          !error &&
            !isSuccess &&
            "border-black-20 focus-within:shadow-focus-shadow-info focus-within:border-info-300"
        )}
        data-testid={clsx(
          error && "error-state",
          isSuccess && "success-state",
          !error && !isSuccess && "textarea"
        )}
      >
        <TextareaAutosize
          className="outline-none w-full resize-none text-black-70 h-auto "
          placeholder={placeholder}
          onChange={onChange}
          minRows={3}
          name={name}
          id={name}
          ref={ref}
        />

        {error && <XIcon theme="danger" />}
        {isSuccess && <CheckedIcon theme="success" />}
      </div>
    );
  }
);

TextArea.defaultProps = {
  error: "",
  isSuccess: false,
};

export default memo(withInputWrap(TextArea));
