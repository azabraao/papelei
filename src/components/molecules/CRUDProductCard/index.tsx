import { memo } from "react";
import { numberToMoney } from "utils";

const ProductItem = (product: Product) => {
  const { name, image, price } = product;

  return (
    <div className="p-4 flex items-center gap-4 rounded-lg shadow-card-effect-soft text-black-70 bg-white">
      <img
        src={image}
        alt={name}
        width={80}
        height={80}
        className="rounded-lg h-20 w-20"
      />
      <div className="flex flex-col gap-2 w-full">
        <span className="text-base">{name}</span>
        <div className="flex gap-2 flex-wrap justify-between w-full">
          <strong className="text-xl flex-1 flex items-center">
            {numberToMoney(price)}
          </strong>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductItem);
