import axios from './axiosInstances/privateAxiosInstance';
import PriceAnalysisItem from 'src/types/PriceAnalysisItem';

const API_URL = '/qm/product/competitorpricedistribution';

export type CompetitorPriceDistributionResponse = {
  competitorPriceDistributionList: PriceAnalysisItem[];
};

export const getCompetitorPriceDistribution = (
  sourceOwnerId: string,
  matchTypeFilter:string,
  region:string,
  priceType:string,
  ): Promise<CompetitorPriceDistributionResponse> => {
  return new Promise<CompetitorPriceDistributionResponse>(resolve => {
    setTimeout(() => {
      resolve(axios.get(API_URL, { 
        params: { 
          sourceOwnerID: sourceOwnerId,
          matchType:matchTypeFilter,
          region:region,
          priceType:priceType,
        } }));
    }, 1000);
  });
};
