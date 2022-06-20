import { createContext, memo, useContext } from "react";
import DragUpToRemove from "./components/DragUpToRemove";
import ProductDetailsWrap from "./components/ProductDetailsWrap";
import ProductImage from "./components/ProductImage";
import ProductWrap from "./components/ProductWrap";
import ProductName from "./components/ProductName";
import ProductTotalPrice from "./components/ProductTotalPrice";
import ProductQuantitySelector from "./components/ProductQuantitySelector";

interface ProductCardProps extends Product {
  error?: boolean;
}

interface ProductCardContextValues {
  code: string;
  image: string;
  name: string;
  error: string | boolean;
}

export const ProductCardContext = createContext({} as ProductCardContextValues);

const ProductCard = ({ code, image, name, error }: ProductCardProps) => {
  return (
    <ProductCardContext.Provider
      value={{
        code,
        image,
        name,
        error,
      }}
    >
      <DragUpToRemove>
        <ProductWrap>
          <ProductImage />
          <ProductDetailsWrap>
            <ProductName />
            <ProductTotalPrice />
          </ProductDetailsWrap>
          <ProductQuantitySelector />
        </ProductWrap>
      </DragUpToRemove>
    </ProductCardContext.Provider>
  );
};

export const useProductCard = (): ProductCardContextValues => {
  const context = useContext(ProductCardContext);
  if (!context)
    throw new Error("useProductCard must be used within a ProductCardProvider");

  return context;
};

ProductCard.defaultProps = {
  error: false,
};

export default memo(ProductCard);
