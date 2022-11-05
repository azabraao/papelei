import emptyBoxGif from "assets/empty-box.gif";
import { Container } from "components/atoms";
import { memo } from "react";

const OnboardingState = () => {
  return (
    <div className="pt-10">
      <Container>
        <div className="flex flex-col gap-2">
          <div className="gap-4 flex flex-col items-start pt-3 pb-10 text-black-70">
            <img src={emptyBoxGif.src} alt="Empty box animation" />

            <div className="flex flex-col">
              <h2 className="text-lg font-bold">Sem produtos</h2>
              <p className="text-base">
                Assim que você adicionar seus produtos, eles aparecerão aqui
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default memo(OnboardingState);
