import PriceStats  from 'src/types/PriceStats';
import axios from './axiosInstances/privateAxiosInstance';

const API_URL = '/qm/product/matches-price-stats';

export type MatchesPriceStatsResponse = {
  priceStats: PriceStats;
};

export const getMatchesPriceStats = (sourceOwnerId:string, productId: string, region:string, matchTypeFilter:string, priceType:string ): Promise<MatchesPriceStatsResponse> => {
  return axios.get(API_URL, {
    params: {
      sourceOwnerID: sourceOwnerId,
      productID: productId,
      region:region,
      matchType:matchTypeFilter,
      priceType:priceType
    },
  });
};
