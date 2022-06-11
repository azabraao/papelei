import clsx from "clsx";
import { Card } from "components/atoms";
import { memo } from "react";

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
          <div
            key={index}
            className={clsx(
              "flex p-4 text-black-70 items-center gap-6 w-full",
              {
                "border border-b-[1px] border-t-0 border-x-0 border-black-20":
                  index !== array.length - 1,
              }
            )}
          >
            <div>
              <img
                src={product.image}
                width={91}
                height={91}
                alt={product.name}
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-lg">{product.name}</p>
              <p className="text-base">{product.price.sale.cash}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default memo(ListProducts);
