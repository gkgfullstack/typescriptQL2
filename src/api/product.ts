import ProductInfo from 'src/types/ProductInfo';
import axios from './axiosInstances/privateAxiosInstance';

const API_URL = '/qm/product/detail';

export type ProductResponse = {
  productDetail: ProductInfo;
};

export const getProduct = (
  productId: string, 
  isSourceProduct:string, 
  sourceOwnerID:string, 
  ownerId:string, 
  matchType:string, 
  variance:string,
  size: number,
  offset: number,
  region:string,
  priceType:string,
  ): Promise<ProductResponse> => {
  return new Promise<ProductResponse>(resolve => {
  setTimeout(() => {
    resolve(axios.get(API_URL, { 
      params: { 
        productId: productId, 
        isSourceProduct:isSourceProduct, 
        sourceOwnerID:sourceOwnerID,
        ownerId:ownerId, 
        matchType:matchType, 
        variance:variance,
        size: size,
        offset: offset,
        region: region,
        priceType: priceType,
      } }));
}, 1);
  });
};
