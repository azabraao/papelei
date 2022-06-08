import { ReactNode, memo } from "react";

interface InputWrapProps {
  label: string;
  name: string;
  error?: string;
  children: ReactNode;
}

const InputWrap = ({ name, error, label, children }: InputWrapProps) => {
  return (
    <div className="flex gap-2 flex-col">
      <label htmlFor={name} className="text-black-70">
        {label}
      </label>
      {children}
      {error && (
        <div className="text-danger text-xs">
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

InputWrap.defaultProps = {
  error: "",
};

export default memo(InputWrap);
