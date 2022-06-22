import { createContext, memo, useCallback, useContext, useState } from "react";
import ProductDetailsWrap from "./components/ProductDetailsWrap";
import ProductImage from "./components/ProductImage";
import ProductWrap from "./components/ProductWrap";
import ProductName from "./components/ProductName";
import ProductTotalPrice from "./components/ProductTotalPrice";
import ProductQuantitySelector from "./components/ProductQuantitySelector";
import DragUpToRemoveOrSwipeToClose from "./components/DragUpToRemoveOrSwipeToClose";
import ProductWindow from "./components/ProductWindow";
import SavePositionQueue from "./components/SavePositionQueue";
import ButtonRemoveProductFromCart from "./components/ButtonRemoveProductFromCart";
import UpdatePriceInput from "./components/UpdatePriceInput";

interface ProductCardProps extends Product {
  error?: boolean;
}

interface ProductCardContextValues {
  code: string;
  image: string;
  name: string;
  error: string | boolean;
  isExpanded: boolean;
  expandProductCard: VoidFunction;
  restoreProductCard: VoidFunction;
  setIsDraggingUp: (isDraggingUp: boolean) => void;
  isDraggingUp: boolean;
}

export const ProductCardContext = createContext({} as ProductCardContextValues);

const ProductCard = ({ code, image, name, error }: ProductCardProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isDraggingUp, setIsDraggingUp] = useState<boolean>(false);

  const expandProductCard = useCallback(() => setIsExpanded(true), []);

  const restoreProductCard = useCallback(() => setIsExpanded(false), []);

  return (
    <ProductCardContext.Provider
      value={{
        expandProductCard,
        restoreProductCard,
        setIsDraggingUp,
        isDraggingUp,
        isExpanded,
        code,
        image,
        name,
        error,
      }}
    >
      {isExpanded && <SavePositionQueue />}
      <ProductWindow>
        <DragUpToRemoveOrSwipeToClose>
          <div>
            <ProductWrap>
              <ProductImage />

              <ProductName />
              {!isExpanded && <ProductTotalPrice />}

              {isExpanded && <UpdatePriceInput />}
              <ProductQuantitySelector />
              {isExpanded && <ProductTotalPrice />}
              {isExpanded && <ButtonRemoveProductFromCart />}
            </ProductWrap>
          </div>
        </DragUpToRemoveOrSwipeToClose>
      </ProductWindow>
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
