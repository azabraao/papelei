import { memo } from "react";
import clsx from "clsx";
import TextareaAutosize from "react-textarea-autosize";
import { CheckedIcon, XIcon } from "components/atoms";
import InputWrap from "../InputWrap";

interface TextAreaProps {
  label: string;
  placeholder: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  isSuccess?: boolean;
}

const TextArea = ({
  name,
  error,
  isSuccess,
  label,
  placeholder,
  onChange,
}: TextAreaProps) => {
  return (
    <InputWrap name={name} error={error} label={label}>
      <div
        className={clsx(
          "flex items-start px-4 py-2 justify-between bg-white rounded-lg border hover:shadow-on-hover-shadow placeholder-black-40 w-full overflow-hidden",
          error &&
            "border-danger focus-within:border-danger focus-within:shadow-none",
          isSuccess &&
            "border-success focus-within:border-success focus-within:shadow-none",
          !error &&
            !isSuccess &&
            "border-black-20 focus-within:shadow-focus-shadow focus-within:border-info-light"
        )}
        data-testid={clsx(
          error && "error-state",
          isSuccess && "success-state",
          !error && !isSuccess && "input"
        )}
      >
        <TextareaAutosize
          className="outline-none w-full resize-none text-black-70 h-auto "
          placeholder={placeholder}
          onChange={onChange}
          minRows={3}
          name={name}
          id={name}
        />

        {error && <XIcon color="danger" />}
        {isSuccess && <CheckedIcon color="success" />}
      </div>
    </InputWrap>
  );
};

TextArea.defaultProps = {
  error: "",
  isSuccess: false,
};

export default memo(TextArea);
