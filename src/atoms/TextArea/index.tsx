import { memo } from "react";
import clsx from "clsx";
import CheckIcon from "../../assets/icons/success/check.svg";
import XIcon from "../../assets/icons/danger/x.svg";
import TextareaAutosize from "react-textarea-autosize";
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
          "flex items-start px-4 py-2 justify-between bg-white border-black-20 rounded-lg border hover:shadow-on-hover-shadow focus-within:shadow-focus-shadow focus-within:border-info-light placeholder-black-40 w-full overflow-hidden",
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
        <TextareaAutosize
          className="outline-none w-full resize-none text-black-70 h-auto "
          placeholder={placeholder}
          onChange={onChange}
          minRows={3}
          name={name}
          id={name}
        />

        {error && <XIcon className="transition-transform" />}
        {isSuccess && <CheckIcon />}
      </div>
    </InputWrap>
  );
};

TextArea.defaultProps = {
  error: "",
  isSuccess: false,
};

export default memo(TextArea);