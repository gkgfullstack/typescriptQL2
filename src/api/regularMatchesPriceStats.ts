
import axios from './axiosInstances/privateAxiosInstance';
import RegularPriceStats from 'src/types/PriceVarianceLower';

const API_URL = '/qm/product/matches-price-stats';

export type RegularMatchesPriceStatsResponse = {
  regularPriceStats: RegularPriceStats;
};

export const getRegularMatchesPriceStats = (productID:string): Promise<RegularMatchesPriceStatsResponse> => {
  return axios.get(API_URL, {
    params: {
      productID: productID,
    },
  });
};
