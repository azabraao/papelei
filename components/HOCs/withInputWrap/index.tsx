import InputWrap from "components/molecules/Form/InputWrap";

const withInputWrap = (Component) => {
  const WrappedComponent = (props) => (
    <InputWrap {...props}>
      <Component {...props} />
    </InputWrap>
  );
  return WrappedComponent;
};

export default withInputWrap;
