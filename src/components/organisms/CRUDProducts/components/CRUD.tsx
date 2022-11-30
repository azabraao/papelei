import clsx from "clsx";
import { Container } from "components/atoms";
import CRUDProductCard from "components/molecules/CRUDProductCard";
import { memo } from "react";

interface CRUDProductsProps {
  products: Product[];
  isLoadingMoreProducts: boolean;
}

const CRUDProducts = ({
  products,
  isLoadingMoreProducts,
}: CRUDProductsProps) => {
  return (
    <div className={clsx("pt-10", isLoadingMoreProducts ? "pb-10" : "pb-24")}>
      <Container>
        <div className="flex flex-col gap-2">
          {products.map((item) => (
            <CRUDProductCard key={item?.id} {...item} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default memo(CRUDProducts);
