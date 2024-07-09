import axios from './axiosInstances/privateAxiosInstance';
import CompetitorVariance from 'src/types/CompetitorVariance';

const API_URL = 'qm/product/competitorpricevariance';
export type CompetitorVarianceResponse = { competitorPriceVarianceList: CompetitorVariance[] };

export const getCompetitorVariance = (
  sourceOwnerId: string,
  matchTypeFilter:string,
  region:string,
  priceType:string
  ): Promise<CompetitorVarianceResponse> => {
  return axios.get(API_URL, { 
    params: { 
      sourceOwnerID: sourceOwnerId,
      matchType: matchTypeFilter,
      region: region,
      priceType: priceType 
    } });
};
