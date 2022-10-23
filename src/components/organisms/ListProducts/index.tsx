import { Container } from "components/atoms";
import { memo } from "react";
import LoadingState from "./components/LoadingState";

const Products = () => {
  return (
    <div className="pt-10">
      <Container>
        {/* <ErrorState /> */}
        <LoadingState />
      </Container>
    </div>
  );
};

export default memo(Products);
