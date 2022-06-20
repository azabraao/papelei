import { memo } from "react";
import { useProductCard } from "..";

const ProductImage = () => {
  const { image } = useProductCard();
  return <img src={image} alt="Product" width={300} height={300} />;
};

export default memo(ProductImage);
