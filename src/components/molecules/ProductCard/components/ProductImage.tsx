import clsx from "clsx";
import { XSimpleIcon } from "components/atoms";
import { memo, useCallback } from "react";
import { useProductCard } from "..";

const ProductImage = () => {
  const { image, isExpanded, restoreProductCard } = useProductCard();

  const handleRestoreProductCard = useCallback((event) => {
    event.stopPropagation();

    restoreProductCard();
  }, []);

  return (
    <div className="flex items-start justify-between">
      <div
        className={clsx("pt-4 pr-4 pl-4", {
          "mb-2": isExpanded,
        })}
      >
        <img src={image} alt="Product" width={127} height={127} />
      </div>
      {isExpanded && (
        <div
          className="pt-4 pr-3 pb-4 pl-4"
          data-testid="x-close-expanded-product-card"
          onClick={handleRestoreProductCard}
        >
          <XSimpleIcon />
        </div>
      )}
    </div>
  );
};

export default memo(ProductImage);
