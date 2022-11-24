import { Container } from "components/atoms";
import CRUDProductCard from "components/molecules/CRUDProductCard";
import { memo } from "react";

interface CRUDProductsProps {
  products: Product[];
}

const CRUDProducts = ({ products }: CRUDProductsProps) => {
  return (
    <div className="pt-10 pb-20">
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
