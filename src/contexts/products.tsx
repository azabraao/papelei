import React, { createContext, memo, useContext } from "react";

interface Product {
  id: string;
}

interface ProductsContextValues {
  products: Product[];
}

export const ProductsContext = createContext({} as ProductsContextValues);

interface ProductsProps {
  children: React.ReactNode;
}

export const ProductsProvider: React.FC<ProductsProps> = ({ children }) => {
  return (
    <ProductsContext.Provider
      value={{
        products: [],
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default memo(ProductsProvider);

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context)
    throw new Error("useProducts must be used within a ProductsProvider");

  return context;
};
