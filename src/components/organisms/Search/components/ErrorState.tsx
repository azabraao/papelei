import { memo } from "react";
import ErrorIceCream from "assets/error-ice-cream";
import { Card } from "components/atoms";

const ErrorState = () => {
  return (
    <Card
      padding={{
        x: "xs",
        y: "lg",
      }}
      testId="error-state"
    >
      <div className="flex gap-8 justify-center items-center flex-col text-center text-black-70">
        <article>
          <h3 className="font-bold text-lg">Ops! Tivemos um problema</h3>
          <p className="text-base">Por favor, tente novamente</p>
        </article>
        <ErrorIceCream />
      </div>
    </Card>
  );
};

export default memo(ErrorState);
