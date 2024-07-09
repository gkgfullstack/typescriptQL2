import axios from './axiosInstances/privateAxiosInstance';
import {PriceCollectedTime} from 'src/types/PriceCollectedTime';

const API_URL = 'qm/product/pricecollectedtime';
export type PriceCollectedTimeResponse = { priceCollectedTime: PriceCollectedTime };

export const getPriceCollectedTime = (
  sourceOwnerId: string,
  region:string, 
  matchTypeFilter:string, 
  priceType:string
  ): Promise<PriceCollectedTimeResponse> => {
  return axios.get(API_URL, { 
    params: { 
      sourceOwnerID: sourceOwnerId,
      region:region, 
      matchType:matchTypeFilter, 
      priceType:priceType
    } });
};
