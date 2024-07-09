//import { ProductFinderFilters } from './../types/ProductFinderFilters';
import axios from './axiosInstances/privateAxiosInstance';
import FilterMatch from 'src/types/FilterMatch';

const API_URL = '/qm/product/matchfilters';
//const API_URLCUSTOM = '/qm/product/customfilter';

export type MatchFiltersResponse = { advanceFilterMenu: { filterList: FilterMatch } };
export const getMatchFilters = (sourceOwnerId: string, productId: string): Promise<MatchFiltersResponse> =>
  axios.get(API_URL, { params: { sourceOwnerID: sourceOwnerId, productId: productId } });


// export const getCustomFilters = (sourceOwnerId: string): Promise<CustomAdvancedFiltersResponse> =>
//   axios.get(API_URLCUSTOM, { params: { sourceOwnerID: sourceOwnerId } });