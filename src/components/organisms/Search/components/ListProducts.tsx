import { memo } from "react";
import { Card } from "components/atoms";
import SearchListProduct from "./SearchListProduct";

interface ListProductsProps {
  products: Product[];
}

const ListProducts = ({ products }: ListProductsProps) => {
  return (
    <Card
      padding={{
        y: "none",
        x: "none",
      }}
      testId="search-list-products"
    >
      <div className="max-h-[80vh] overflow-y-auto">
        {products.map((product, index, array) => (
          <SearchListProduct
            key={product.code}
            product={product}
            isLastProduct={index === array.length - 1}
          />
        ))}
      </div>
    </Card>
  );
};

export default memo(ListProducts);
