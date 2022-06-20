import { memo } from "react";
import { useProductCard } from "..";

const ProductName = () => {
  const { name } = useProductCard();

  return (
    <div className="flex items-center min-h-[48px]">
      <span className="webkit-box line-clamp-2 box-orient-vertical text-ellipsis overflow-hidden  ">
        {name}
      </span>
    </div>
  );
};

export default memo(ProductName);
