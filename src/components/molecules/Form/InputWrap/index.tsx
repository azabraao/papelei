import { Label } from "components/atoms";
import { ReactNode, memo } from "react";

interface InputWrapProps {
  label?: string;
  name: string;
  error?: string;
  children: ReactNode;
  labelSize?: string;
  labelCentered?: boolean;
}

const InputWrap = ({
  labelSize,
  name,
  error,
  label,
  children,
  labelCentered,
}: InputWrapProps) => {
  return (
    <div className="flex gap-2 flex-col">
      {label && (
        <Label
          label={label}
          htmlFor={name}
          labelSize={labelSize}
          labelCentered={labelCentered}
        />
      )}
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
  labelSize: "base",
  label: "",
};

export default memo(InputWrap);
