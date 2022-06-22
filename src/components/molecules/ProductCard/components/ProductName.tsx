import clsx from "clsx";
import { memo } from "react";
import { useProductCard } from "..";

const ProductName = () => {
  const { name, isExpanded } = useProductCard();

  return (
    <div
      className={clsx("flex items-center ", { "min-h-[48px]": !isExpanded })}
    >
      <span
        className={clsx("pl-4 pr-4 block w-full", {
          "text-lg font-bold": isExpanded,
          "webkit-box line-clamp-2 box-orient-vertical text-ellipsis overflow-hidden ":
            !isExpanded,
        })}
      >
        {name}
      </span>
    </div>
  );
};

export default memo(ProductName);
