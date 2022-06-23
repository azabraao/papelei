import { Container } from "components/atoms";
import { PaymentMethodSelector, ProductCard } from "components/molecules";
import { useCart } from "contexts/cart";
import { useCartScroll } from "contexts/cartScroll";
import { memo, useCallback } from "react";
import EmptyCartState from "./components/EmptyCartState";

const Cart = () => {
  const { cartIsEmpty, cartProducts, setPaymentMethod } = useCart();
  const { setIsScrolling } = useCartScroll();

  const onScrollEnd = useCallback(() => {
    setIsScrolling(false);
  }, []);

  const onScroll = useCallback(() => {
    setIsScrolling(true);
  }, []);

  if (cartIsEmpty) return <EmptyCartState />;

  return (
    <div className="py-6 flex flex-col gap-2 items-start">
      <Container>
        <h2 className="font-medium text-black-70 text-2xl">Produtos</h2>
      </Container>

      <div
        data-testid="cart-scroll"
        onScroll={onScroll}
        onTouchEndCapture={onScrollEnd}
        className="overflow-scroll mx-auto max-w-6xl md:px-10 w-full scrollbar-none overscroll-y-contain"
      >
        <div className="px-4 lg:px-0 flex gap-4 w-fit py-1">
          {cartProducts.map((product: Product) => (
            <ProductCard key={product.code} {...product} />
          ))}
        </div>
      </div>
      <Container>
        <PaymentMethodSelector
          onMethodSelected={setPaymentMethod}
          label="Usar preços"
        />
      </Container>
    </div>
  );
};

export default memo(Cart);
