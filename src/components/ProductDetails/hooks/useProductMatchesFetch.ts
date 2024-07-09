import { useEffect, useReducer } from 'react';
import ProductMatch from 'src/types/ProductMatch';
import { getProductMatches, ProductMatchesResponse } from 'src/api/matches';
import { FETCH_ACTION_TYPES, fetchReducer } from 'src/reducers/fetchReducer';
import ProductMatchInfo from 'src/types/ProductMatcheInfo';
import { Sorting } from 'src/types/Sorting';
import { getProduct, ProductResponse } from 'src/api/product';
import axios from 'axios';
import { MATCHES_ACTION_TYPES, MatchesAction, matchesReducer, MatchesState } from '../reducers/matchesReducer';
import { useProductDetailsStateContext } from 'src/stateProviders/useProductDetailsStateContext';
import useSourceOwnerId from 'src/hooks/useSourceOwnerId';
import useQueryUrlParams from 'src/hooks/useQueryUrlParams';

const initialState: MatchesState = {
  loading: false,
  error: false,
  data: null,
  total: 0,
  page: 1,
  offset: 1,
  size: 5,
  hasMore: false,
  sorting: null,
  ownerId: '',
  matchType: 'ALL',
  variance: '',
  region:"-1", 
  priceType:"1"
};

export type DispatchMatches = {
  fetchMore: (count?: number) => void;
};
const isSourceProduct = "0";
const useProductMatchesFetch = (
  initialSorting: Sorting<ProductMatchInfo>,
  initialSize: number,
  initialOwnerId: string,
  initialVariance: string,
  initialOffset: number,
): [MatchesState, DispatchMatches] => {

  let {
    productId,
    removedMatches,
    benchmarkedMatches,
    unBenchmarkedMatches,
    ownerId,
    variance
    
  } = useProductDetailsStateContext();
  let  { region, matchTypeFilter, priceType } = useQueryUrlParams(); 
  let initialMatchTypeFilterIds:string = matchTypeFilter  !== undefined ? matchTypeFilter :"ALL";
  let initialRegionIds:string = region  !== undefined ? region :"-1";
  let initialPriceTypeIds:string = priceType  !== undefined ? priceType :"1";
  const sourceOwnerId = useSourceOwnerId();
  const [state, dispatch] = useReducer(
    (state: MatchesState, action: MatchesAction) => {
      const fetchState: MatchesState = fetchReducer(state, action) as MatchesState;
      return matchesReducer({ ...fetchState }, action);
    },
    {
      ...initialState,
      sorting: initialSorting,
      size: initialSize,
      ownerId: initialOwnerId,
      matchType: initialMatchTypeFilterIds,
      variance: initialVariance,
      offset: initialOffset
    }
  );
  const { sorting, offset, size,  } = state;
  //let offsetss2: number = offset === undefined ? 1 : 1;
console.log('useProductMatchesFetch.ts===', size)

  useEffect(() => {
    if (initialSorting && initialSize && initialOwnerId) {
      dispatch({
        type: MATCHES_ACTION_TYPES.setOwnerId,
        payload: {
          sorting: initialSorting,
          size: initialSize,
          ownerId: initialOwnerId,
        }
      });
    }
  }, [initialSorting, initialSize, initialOwnerId]);

  useEffect(() => {
    if (initialSorting && initialSize && initialMatchTypeFilterIds) {
      dispatch({
        type: MATCHES_ACTION_TYPES.setMatchType,
        payload: {
          sorting: initialSorting,
          size: initialSize,
          matchType: initialMatchTypeFilterIds,
        }
      });
    }
  }, [initialSorting, initialSize, initialMatchTypeFilterIds]);

  useEffect(() => {
    if (initialSorting && initialSize  && initialVariance) {
      dispatch({
        type: MATCHES_ACTION_TYPES.setVariance,
        payload: {
          sorting: initialSorting,
          size: initialSize,
          variance: initialVariance,
        }
      });
    }
  }, [initialSorting, initialSize, initialVariance]);

  useEffect(() => {
    if (initialSorting && initialSize && initialOwnerId ) {
      dispatch({
        type: MATCHES_ACTION_TYPES.updateOptions,
        payload: {
          sorting: initialSorting,
          size: initialSize,
          ownerId: initialOwnerId,
          matchType: initialMatchTypeFilterIds,
          variance: initialVariance,
          region: initialRegionIds,
          priceType: initialPriceTypeIds,
          offset : offset

        }
      });
    }
  }, [
    initialSorting,
    initialSize,
    initialOwnerId,
    initialMatchTypeFilterIds,
    initialVariance,
    region, matchTypeFilter, priceType
  ]);

  useEffect(() => {
    if (removedMatches) {
      dispatch({ type: MATCHES_ACTION_TYPES.removeMatches, payload: { removedMatches } });
    }
    return () => { }
  }, [removedMatches]);

  useEffect(() => {
    if (benchmarkedMatches) {
      dispatch({ type: MATCHES_ACTION_TYPES.benchmarkMatches, payload: { benchmarkedMatches } });
    }
    return () => { }
  }, [benchmarkedMatches]);

  useEffect(() => {
    if (unBenchmarkedMatches) {
      dispatch({ type: MATCHES_ACTION_TYPES.unBenchmarkMatches, payload: { unBenchmarkedMatches } });
    }
    return () => { }
  }, [unBenchmarkedMatches]);

  let ownerIdss: string = ownerId !== undefined ? ownerId : '';
  let variancess: string = variance !== undefined ? variance : '';
  let offsetss: number = offset !== undefined ? offset : 1;
  let sizess: number = size !== undefined ? size : 0;
  useEffect(() => {
    let ignore = false;
    const fetch = async () => {
      if (productId) {
        dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
        try {
          const response: ProductMatchesResponse = await getProductMatches(
            productId, 
            sourceOwnerId,
            offsetss, 
            sizess, 
            sorting,
            ownerIdss,
            initialMatchTypeFilterIds,
            variancess,
            initialRegionIds,
            initialPriceTypeIds
            );
          const matches = response.productMatches;
          const requests: Promise<ProductResponse>[] = matches.map((match: ProductMatch) =>
            getProduct(match.productId, isSourceProduct, sourceOwnerId, ownerIdss,
              initialMatchTypeFilterIds,
              variancess, 
              offsetss,
              sizess,
              initialRegionIds, 
              initialPriceTypeIds
             
              )
          );
          const responses: ProductResponse[] = await axios.all(requests);
          const info: ProductMatchInfo[] = responses.map((response: ProductResponse, index: number) => {
            const productMatchInfo: ProductMatchInfo = {
              ...response.productDetail,
              ...matches[index],
            };
            return productMatchInfo;
          });
          if (!ignore) {
            dispatch({
              type: MATCHES_ACTION_TYPES.addMatches,
              payload: {
                data: [...info],
                total: response.totalRecords,
                ownerId: ownerIdss,                
                variance: variancess,
                sorting: initialSorting, 
                size: sizess,
                matchType: initialMatchTypeFilterIds,
                region:initialRegionIds, 
                priceType:initialPriceTypeIds,
              },
            });
          }

        } catch (e) {
          if (!ignore) {
            dispatch({ type: FETCH_ACTION_TYPES.setError, payload: { error: e } });
          }
        }
      }
    };
    fetch();
    return (): void => {
      ignore = true;
    };
  }, [
    productId, 
    offset, 
    size, 
    sorting, 
    sourceOwnerId,
    ownerId,
    initialMatchTypeFilterIds,
    variance,
    initialPriceTypeIds,
    region, matchTypeFilter, priceType
  ]);

  return [
    state,
    {
      fetchMore: (count?: number): void => {
        dispatch({ type: MATCHES_ACTION_TYPES.fetchMoreMatches, payload: { sorting:sorting, size: count || initialSize } });
      },
    },
  ];
};

export default useProductMatchesFetch;
