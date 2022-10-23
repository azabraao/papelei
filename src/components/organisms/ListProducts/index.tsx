import { Container } from "components/atoms";
import { memo } from "react";
import ErrorState from "./components/ErrorState";

const Products = () => {
  return (
    <Container>
      <ErrorState />
    </Container>
  );
};

export default memo(Products);
