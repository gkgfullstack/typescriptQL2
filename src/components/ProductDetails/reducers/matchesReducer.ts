import produce from 'immer';
import ProductMatchInfo from 'src/types/ProductMatcheInfo';
import { Action, FetchState } from 'src/reducers/fetchReducer';
import { Sorting } from '../../../types/Sorting';
import ProductFinderInfo from 'src/types/ProductFinderInfo';

export enum MATCHES_ACTION_TYPES {
  fetchMoreMatches = 'FETCH_MORE_MATCHES',
  updateOptions = 'UPDATE_OPTIONS',
  removeMatches = 'REMOVE_MATCHES',
  addMatches = 'ADD_MATCHES',
  benchmarkMatches = 'BENCHMARK',
  unBenchmarkMatches = 'UNBENCHMARK',
  setOwnerId = 'OWNERID',
  setMatchType = 'MATCHTYPE',
  setVariance = 'VARIANCE',
  updateFilterMatches = 'UPDATEFILTERMATCHES'
}

export type MatchesState = FetchState<Array<ProductMatchInfo>> & {
  total: number;
  hasMore: boolean;
  offset: number;
  size: number;
  page: number;
  sorting: Sorting<ProductMatchInfo> | null;
  //randomUpdate: number;
  ownerId: string;
  matchType: string;
  variance: string;
  region:string;
  priceType:string;
};

export type FetchMoreMatchesAction = {
  type: MATCHES_ACTION_TYPES.fetchMoreMatches;
  payload: Pick<MatchesState, 'sorting' | 'size'>;
};

export type AddMatchAction = {
  type: MATCHES_ACTION_TYPES.addMatches;
  payload: Pick<MatchesState, 'data' | 'total' | 'sorting' | 'size' | 'ownerId' | 'matchType' | 'variance' | 'region' | 'priceType' >;
};

export type RemoveMatchesAction = {
  type: MATCHES_ACTION_TYPES.removeMatches;
  payload: { removedMatches: ProductMatchInfo[] };
};

export type BenchmarkMatchesAction = {
  type: MATCHES_ACTION_TYPES.benchmarkMatches;
  payload: { benchmarkedMatches: ProductMatchInfo[] };
};

export type UnBenchmarkMatchesAction = {
  type: MATCHES_ACTION_TYPES.unBenchmarkMatches;
  payload: { unBenchmarkedMatches: ProductMatchInfo[] };
};

export type UpdateOptionsAction = {
  type: MATCHES_ACTION_TYPES.updateOptions;
  payload: Pick<MatchesState, 'sorting' | 'size' | 'offset' | 'ownerId' | 'matchType' | 'variance' | 'region' | 'priceType'>;
};

export type OwnerIdOptionsAction = {
  type: MATCHES_ACTION_TYPES.setOwnerId;
  payload: Pick<MatchesState, 'sorting' | 'size' | 'ownerId'>;
};

export type MatchTypeOptionsAction = {
  type: MATCHES_ACTION_TYPES.setMatchType;
  payload: Pick<MatchesState, 'sorting' | 'size' | 'matchType' >;
};

export type VarianceOptionsAction = {
  type: MATCHES_ACTION_TYPES.setVariance;
  payload: Pick<MatchesState, 'sorting' | 'size' | 'variance'>;
};

export type MatchesAction =
  | Action<Array<ProductMatchInfo>>
  | AddMatchAction
  | RemoveMatchesAction
  | UpdateOptionsAction
  | BenchmarkMatchesAction
  | UnBenchmarkMatchesAction
  | FetchMoreMatchesAction
  | OwnerIdOptionsAction
  | MatchTypeOptionsAction
  | VarianceOptionsAction;

export type ProductListAction = Action<Array<ProductFinderInfo>> | UpdateOptionsAction | AddMatchAction;

export const matchesReducer = (state: MatchesState, action: MatchesAction): MatchesState =>
  produce(state, (draft: MatchesState) => {
    switch (action.type) {
      case MATCHES_ACTION_TYPES.fetchMoreMatches: {
        const { sorting, size } = action.payload; 
        if (size !== draft.size) {
          draft.size = size;
        } else if(size > 0){
          draft.size = draft.total;
        }  else{
          draft.size = draft.total;
        }   
        if (draft.hasMore && draft.data) {
          draft.offset = 1;
          draft.size = draft.total;
        }
        if (JSON.stringify(sorting) !== JSON.stringify(draft.sorting)) {
          draft.sorting = sorting;
        }
        return draft;
      }
      case MATCHES_ACTION_TYPES.setOwnerId: {
        const { sorting, size, ownerId } = action.payload;
        draft.loading = false;
        draft.error = false;
        const { data } = draft;
       
          if (data) {
            draft.data = [...data];
            draft.hasMore = draft.data.length < draft.total;
          } else {
          if (JSON.stringify(sorting) !== JSON.stringify(draft.sorting)) {
            draft.sorting = sorting;
          }
          if (ownerId !== draft.ownerId) {
            draft.ownerId = ownerId;
          }
          if (size !== draft.size) {
            draft.size = size;
          }
          
        }
        return draft;
      }
      case MATCHES_ACTION_TYPES.setMatchType: {
        const { sorting, size, matchType } = action.payload;
        const { data } = draft;
       
          if (data) {
            draft.data = [...data];
            draft.hasMore = draft.data.length < draft.total;
            draft.offset = 1;  
            draft.size = size;      
          
        } else {
          if (JSON.stringify(sorting) !== JSON.stringify(draft.sorting)) {
            draft.sorting = sorting;
            draft.offset = 1;
            draft.matchType = matchType;
            //draft.matchType = matchType;
          }
          if (size !== draft.size) {
            draft.size = size;
          }
          if (JSON.stringify(matchType) !== JSON.stringify(draft.matchType)) {
            draft.matchType = matchType;
          }
          
        }
        if (JSON.stringify(sorting) !== JSON.stringify(draft.sorting)) {
          draft.sorting = sorting;
        }
        return draft;
      }
      case MATCHES_ACTION_TYPES.setVariance: {
        const { sorting, size, variance } = action.payload;
        if (size !== draft.size) {
          draft.size = size;
        }
          if (JSON.stringify(sorting) !== JSON.stringify(draft.sorting)) {
            draft.sorting = sorting;
            draft.offset = 1;
            draft.size = size;
            draft.variance = variance;
            
          }
          
          if (JSON.stringify(variance) !== JSON.stringify(draft.variance)) {
            draft.variance = variance;
          }

        

        return draft;
      }
      case MATCHES_ACTION_TYPES.updateOptions: {
        const { sorting, size, offset, matchType, region, priceType } = action.payload;
          if (size !== draft.size) {
            draft.size = size;
          }
          if (JSON.stringify(sorting) !== JSON.stringify(draft.sorting)) {
            draft.sorting = sorting;
            draft.offset = offset;
            draft.matchType = matchType;
            draft.region = region;
            draft.priceType = priceType;
          }
          
          if (JSON.stringify(matchType) !== JSON.stringify(draft.matchType)) {
            draft.matchType = matchType;
            draft.size = size;
            draft.offset = offset;

          }
          if (JSON.stringify(region) !== JSON.stringify(draft.region)) {
            draft.region = region;
            draft.size = size;
            draft.offset = offset;

          }
          if (JSON.stringify(priceType) !== JSON.stringify(draft.priceType)) {
            draft.priceType = priceType;
            draft.size = size;
            draft.offset = offset;

          }
        
        return draft;
      }
      case MATCHES_ACTION_TYPES.addMatches: {
        const { data, total, sorting, size, ownerId, matchType, variance, region, priceType  } = action.payload;
        draft.loading = false;
        draft.error = false;
       
          if (total) {
            draft.total = total;
          }
          if (JSON.stringify(sorting) !== JSON.stringify(draft.sorting)) {
            draft.sorting = sorting;
            draft.offset = 1;
            draft.size = size;
          }
          // if (size) {
          //   draft.size = size;
          // }

          let dataOld: ProductMatchInfo[] | null = draft.data;
          if (data !== null && draft.data) {
            data.forEach((dataVal: ProductMatchInfo) => {
              if (dataOld) {
                const index = dataOld.indexOf(dataVal, 0);

                dataOld.splice(index, 1);
              }
            });
            draft.data = dataOld;
          }
          if (JSON.stringify(ownerId) !== JSON.stringify(draft.ownerId)) {
            draft.ownerId = ownerId;
            if (data) {
              draft.data = [...data];
              draft.hasMore = draft.data.length < draft.total;
              draft.offset = 1; 
              draft.size = draft.total;         
            }
            return draft;
          }
          if (JSON.stringify(matchType) !== JSON.stringify(draft.matchType)) {
            draft.matchType = matchType;
            //draft.size = size;
            if (data) {
              draft.data = [...data];
              draft.hasMore = draft.data.length < draft.total;
              draft.offset = 1;
            }
            return draft;
          }
          if (JSON.stringify(region) !== JSON.stringify(draft.region)) {
            draft.region = region;
            //draft.size = size;
            if (data) {
              draft.data = [...data];
              draft.hasMore = draft.data.length < draft.total;
              draft.offset = 1;
            }
            return draft;
          }
          if (JSON.stringify(priceType) !== JSON.stringify(draft.priceType)) {
            draft.priceType = priceType;
            //draft.size = size;
            if (data) {
              draft.data = [...data];
              draft.hasMore = draft.data.length < draft.total;
              draft.offset = 1;
            }
            return draft;
          }
          if (JSON.stringify(variance) !== JSON.stringify(draft.variance)) {
            draft.variance = variance;
            if (data) {
              draft.data = [...data];
              draft.hasMore = draft.data.length < draft.total;
              draft.offset = 1;
            }
            return draft;
          }
          if (data) {
            draft.data = draft.data && draft.offset >= 1 ? [...draft.data, ...data] : [...data];
            draft.hasMore = draft.data.length < draft.total;
          }
        
        return draft;
      }
      case MATCHES_ACTION_TYPES.removeMatches: {
        const { removedMatches = [] } = action.payload;
        const { data } = draft;
        let hasChanges = false;
        if (data !== null) {
          removedMatches.forEach((removedMatch: ProductMatchInfo) => {
            const index = data.findIndex((dataItem: ProductMatchInfo): boolean => {
              if (removedMatch.productId === dataItem.productId) {
                return removedMatch.productId === dataItem.productId;
              } else {
                return false;
              }

            });
            if (index !== -1 && draft.data) {
              data[index].removeRequest = true;
              if (!hasChanges) {
                hasChanges = true;
              }
            }
          });
          if (hasChanges) {
            draft.data = [...data];
          }
        }
        return draft;
      }
      case MATCHES_ACTION_TYPES.benchmarkMatches: {
        const { benchmarkedMatches = [] } = action.payload;
        const { data } = draft;
        let hasChangesbenchmark = false;
        if (data !== null) {
          benchmarkedMatches.forEach((benchmarkedMatch: ProductMatchInfo) => {
            const index = data.findIndex((dataItem: ProductMatchInfo): boolean => {
              if (benchmarkedMatch.productId === dataItem.productId) {
                return benchmarkedMatch.benchmarkMatch === dataItem.benchmarkMatch
              }
              else {
                return false;
              }

            });
            if (index !== -1 && draft.data) {
              data[index].benchmarkMatch = '1';
              if (!hasChangesbenchmark) {
                hasChangesbenchmark = true;
              }
            }
          });
          if (hasChangesbenchmark) {
            draft.data = [...data];
          }
        }
        return draft;
      }
      case MATCHES_ACTION_TYPES.unBenchmarkMatches: {
        const { unBenchmarkedMatches = [] } = action.payload;
        const { data } = draft;
        let hasChangesunbenchmark = false;
        if (data !== null) {
          unBenchmarkedMatches.forEach((unBenchmarkedMatch: ProductMatchInfo) => {
            const index = data.findIndex((dataItem: ProductMatchInfo): boolean => {
              if (unBenchmarkedMatch.productId === dataItem.productId) {
                return unBenchmarkedMatch.benchmarkMatch === dataItem.benchmarkMatch
              }
              else {
                return false;
              }

            });
            if (index !== -1 && draft.data) {
              data[index].benchmarkMatch = '0';
              if (!hasChangesunbenchmark) {
                hasChangesunbenchmark = true;
              }
            }
          });
          if (hasChangesunbenchmark) {
            draft.data = [...data];
          }
        }
        return draft;
      }

      default: {
        return draft;
      }
    }
  });
