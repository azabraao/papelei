import ErrorIceCream from "assets/error-ice-cream";
import { Container } from "components/atoms";
import { memo } from "react";

const ErrorState = () => {
  return (
    <div className="pt-10">
      <Container>
        <div className="flex gap-8 justify-center items-center flex-col text-center text-black-70">
          <article>
            <h3 className="font-bold text-lg">Ops! Tivemos um problema</h3>
            <p className="text-base">Por favor, tente novamente</p>
          </article>
          <ErrorIceCream />
        </div>
      </Container>
    </div>
  );
};

export default memo(ErrorState);
