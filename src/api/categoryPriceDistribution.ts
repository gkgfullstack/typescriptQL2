import axios from './axiosInstances/privateAxiosInstance';
import PriceAnalysisItem from 'src/types/PriceAnalysisItem';

const API_URL = '/qm/product/categorypricedistribution';

export type CategoryPriceDistributionResponse = {
  categoryPriceDistributionList: PriceAnalysisItem[];
};

export const getCategoryPriceDistribution = (
  sourceOwnerId: string,
  matchTypeFilter:string,
  region:string,
  priceType:string
  ): Promise<CategoryPriceDistributionResponse> => {
  return new Promise<CategoryPriceDistributionResponse>(resolve => {
        setTimeout(() => {
          resolve(axios.get(API_URL, { 
            params: { 
              sourceOwnerID: sourceOwnerId,
              matchType:matchTypeFilter,
              region:region, 
              priceType:priceType
            } }));
        }, 1000);
      });
};
