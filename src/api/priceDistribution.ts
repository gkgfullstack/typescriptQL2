import axios from './axiosInstances/privateAxiosInstance';
import PriceDistribution from 'src/types/PriceDistribution';

const API_URL = '/qm/product/pricedistribution';

export type PriceDistributionResponse = { priceDistributionList: PriceDistribution[] };

export const getPriceDistribution = (
  sourceOwnerId: string,
  matchTypeFilter:string,
  region:string,
  priceType:string
  ): Promise<PriceDistributionResponse> => {
  return axios.get(API_URL, { 
    params: { 
      sourceOwnerID: sourceOwnerId,
      matchType:matchTypeFilter, 
      region:region, 
      priceType:priceType
    } });
};
