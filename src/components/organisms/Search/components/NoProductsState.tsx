import { memo } from "react";
import { Card } from "components/atoms";
import NotFound from "assets/not-found";

const ErrorState = () => {
  return (
    <Card
      padding={{
        x: "xs",
        y: "lg",
      }}
      testId="no-products-state"
    >
      <div className="flex gap-8 justify-center items-center flex-col text-center text-black-70">
        <article>
          <h3 className="font-bold text-lg">Nenhum produto encontrado</h3>
          <p className="text-base">Tente mudar as palavras-chave</p>
        </article>
        <NotFound />
      </div>
    </Card>
  );
};

export default memo(ErrorState);
