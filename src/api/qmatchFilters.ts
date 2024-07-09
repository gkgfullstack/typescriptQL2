import { ProductFinderFilters } from './../types/ProductFinderFilters';
import axios from './axiosInstances/privateAxiosInstance';

const API_URL = '/qm/product/filter-menu';
const API_URLCUSTOM = '/qm/product/customfilter';

export type AdvancedFiltersResponse = { advanceFilterMenu: { filterList: ProductFinderFilters } };

export const getAdvancedFilters = (
  sourceOwnerId: string,
  matchTypeFilter:string,
  region:string,
  priceType:string
  ): Promise<AdvancedFiltersResponse> =>
  axios.get(API_URL, { 
    params: { 
      sourceOwnerID: sourceOwnerId,
      matchType:matchTypeFilter,
      region:region,
      priceType:priceType
    } });

  export type CustomAdvancedFiltersResponse = {
    customFilter: { customFilterList: ProductFinderFilters }
  };
export const getCustomFilters = (sourceOwnerId: string): Promise<CustomAdvancedFiltersResponse> =>
  axios.get(API_URLCUSTOM, { params: { sourceOwnerID: sourceOwnerId } });