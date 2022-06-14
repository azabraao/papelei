import { memo } from "react";
import { Container } from "components/atoms";
import { useCart } from "contexts/cart";

const AppCopyTitle = () => {
  const { cartIsEmpty } = useCart();

  if (!cartIsEmpty) return null;

  return (
    <div className="pt-10">
      <Container>
        <h1 className="text-2xl text-center text-black-70">
          Crie seu orçamento em poucos cliques
        </h1>
      </Container>
    </div>
  );
};

export default memo(AppCopyTitle);
