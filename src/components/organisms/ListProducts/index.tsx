import { Container } from "components/atoms";
import { memo } from "react";
import LoadingState from "./components/LoadingState";
import OnboardingState from "./components/OnboardingState";

const Products = () => {
  return (
    <div className="pt-10">
      <Container>
        {/* <ErrorState /> */}
        {/* <LoadingState /> */}

        <OnboardingState />
      </Container>
    </div>
  );
};

export default memo(Products);
