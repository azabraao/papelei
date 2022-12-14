import InputWrap from "components/molecules/Form/InputWrap";
import React from "react";

const withInputWrap = <T, P>(Component) => {
  const WrappedComponent = (props, ref) => (
    <InputWrap {...props}>
      <Component {...props} ref={ref} />
    </InputWrap>
  );
  return React.forwardRef<T, P>(WrappedComponent);
};

export default withInputWrap;
