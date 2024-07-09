import React from 'react';
import { ProductDetailsStateProvider } from 'src/stateProviders/productDetailsStateProvider';
import ProductDetailsView from './ProductDetailsView/ProductDetailsView';

type ProductDetailsProps = {
  
};
 
const ProductDetails: React.FC<ProductDetailsProps> = () => {
  return (
    <ProductDetailsStateProvider>
      <ProductDetailsView />
    </ProductDetailsStateProvider>
  );
};

export default ProductDetails;
