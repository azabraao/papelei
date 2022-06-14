import { Container } from "components/atoms";
import { PaymentMethodSelector, ProductCard } from "components/molecules";
import { useCart } from "contexts/cart";
import { memo } from "react";
import EmptyCartState from "./components/EmptyCartState";

const Cart = () => {
  const { cartIsEmpty, cartProducts } = useCart();

  if (cartIsEmpty) return <EmptyCartState />;

  return (
    <div className="py-6 flex flex-col gap-2 items-start">
      <Container>
        <h2 className="font-medium text-black-70 text-2xl">Produtos</h2>
      </Container>

      <div className="overflow-x-scroll mx-auto max-w-6xl md:px-10 w-full scrollbar-none">
        <div className="px-4 flex gap-4 w-fit py-1">
          {cartProducts.map((product: Product) => (
            <ProductCard key={product.code} {...product} />
          ))}
        </div>
      </div>
      <Container>
        <PaymentMethodSelector
          onMethodSelected={() => null}
          label="Usar preços"
        />
      </Container>
    </div>
  );
};

export default memo(Cart);
