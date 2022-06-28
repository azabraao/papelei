import { memo, useEffect, useRef } from "react";
import clsx from "clsx";
import { Container, FloatingButton, Label, SearchIcon } from "components/atoms";
import { useSearch } from "contexts/search";
import { useCart } from "contexts/cart";

const ButtonOpenSearch = () => {
  const ref = useRef(null);

  const { openSearch, searchIsOpen } = useSearch();
  const { cartIsEmpty } = useCart();

  useEffect(() => {
    if (ref.current) {
      if (searchIsOpen) {
        const decreaseTop = cartIsEmpty ? 44 : 31;
        const translateY =
          ref.current.getBoundingClientRect().top - decreaseTop;
        ref.current.style.transform = `translateY(-${translateY}px)`;
      } else {
        ref.current.style.transform = `translateY(0px)`;
      }
    }
  }, [searchIsOpen]);

  if (!cartIsEmpty)
    return (
      <FloatingButton
        ref={ref}
        onClick={openSearch}
        testid="button-open-search"
      />
    );

  return (
    <Container>
      <div onClick={openSearch} data-testid="button-open-search">
        <div className={clsx("flex flex-col py-2 gap-2")}>
          {!searchIsOpen && (
            <Label
              label={
                cartIsEmpty
                  ? "Do que você precisa?"
                  : "Do que mais você precisa?"
              }
              labelCentered={cartIsEmpty}
              labelSize="lg"
            />
          )}
          <button
            className={clsx(
              "px-4 py-2 flex items-center justify-between bg-white rounded-lg border hover:shadow-on-hover-shadow text-black-40 w-full overflow-hidden border-black-20 focus-within:shadow-focus-shadow-info focus-within:border-info-light transition-all"
            )}
            ref={ref}
          >
            <span>Escreva o nome do produto</span>
            <SearchIcon theme="black-40" />
          </button>
        </div>
      </div>
    </Container>
  );
};

export default memo(ButtonOpenSearch);
