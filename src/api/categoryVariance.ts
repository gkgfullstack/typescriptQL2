import axios from './axiosInstances/privateAxiosInstance';
import categoryPriceVarianceList from 'src/types/CategoryVariance';

const API_URL = 'qm/product/categorypricevariance';
export type CategoryVarianceResponse = { 
  categoryPriceVarianceList: categoryPriceVarianceList[] 
};

export const getCategoryVariance = (
  sourceOwnerId: string, 
  matchTypeFilter:string, 
  region:string, 
  priceType:string
  ): Promise<CategoryVarianceResponse> => {
  return axios.get(API_URL, { 
    params: { 
    sourceOwnerID: sourceOwnerId,
    matchType:matchTypeFilter, 
    region:region, 
    priceType:priceType 
  } });
};
