import React from 'react';
import { SearchProductsStateProvider } from 'src/stateProviders/searchProductsStateProvider';
import ProductFinderView from './ProductFinderView/ProductFinderView';

type ProductFinderProps = {};
const ProductFinder: React.FC<ProductFinderProps> = () => {
  return (
    <SearchProductsStateProvider>
      <ProductFinderView /> 
    </SearchProductsStateProvider>
  );
};

export default ProductFinder;
