import { memo } from "react";
import NoProducts from "assets/no-products";
import { Container } from "components/atoms";

const EmptyCartState = () => {
  return (
    <Container
      testid="empty-cart"
      className="gap-4 flex flex-col items-center pt-6 pb-10"
    >
      <NoProducts />

      <span className="text-black-70 text-center">
        Nenhum produto selecionado
      </span>
    </Container>
  );
};

export default memo(EmptyCartState);
