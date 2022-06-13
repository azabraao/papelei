import InputWrap from "components/molecules/Form/InputWrap";
import React from "react";

const withInputWrap = (Component) => {
  const WrappedComponent = (props, ref) => (
    <InputWrap {...props}>
      <Component {...props} ref={ref} />
    </InputWrap>
  );
  return React.forwardRef(WrappedComponent);
};

export default withInputWrap;
