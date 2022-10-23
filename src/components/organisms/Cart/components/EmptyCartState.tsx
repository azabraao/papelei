import { memo } from "react";
import emptyBoxGif from "assets/empty-box.gif";
import { Container } from "components/atoms";

const EmptyCartState = () => {
  return (
    <Container
      testid="empty-cart"
      className="gap-4 flex flex-col items-start pt-3 pb-10"
    >
      <img src={emptyBoxGif.src} alt="Empty box animation" />

      <span className="text-base text-black-70">
        Nenhum produto selecionado
      </span>
    </Container>
  );
};

export default memo(EmptyCartState);
