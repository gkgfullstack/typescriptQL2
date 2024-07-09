import { useEffect, useReducer } from 'react';
import { fetchReducer, FETCH_ACTION_TYPES, FetchState } from 'src/reducers/fetchReducer';
import PriceAnalysisItem from 'src/types/PriceAnalysisItem';
import { CategoryPriceDistributionResponse, getCategoryPriceDistribution } from 'src/api/categoryPriceDistribution';

const initialState: FetchState<PriceAnalysisItem[]> = {
  loading: false,
  error: false,
  data: null,
};

const useCategoryPriceDistributionFetch = (
  sourceOwnerId:string,
  matchTypeFilter:string, 
  region:string, 
  priceType:string
  ): [FetchState<PriceAnalysisItem[]>] => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  useEffect(() => {
    let ignore = false;
    const fetch = async () => {
      dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
      try {
        const response: CategoryPriceDistributionResponse = await getCategoryPriceDistribution(
          sourceOwnerId,
          matchTypeFilter, 
          region, 
          priceType
          );
        if (!ignore) {
          dispatch({ type: FETCH_ACTION_TYPES.setData, payload: { data: response.categoryPriceDistributionList } });
        }
      } catch (e) {
        if (!ignore) {
          dispatch({ type: FETCH_ACTION_TYPES.setError, payload: { error: e } });
        }
      }
    };
    if (sourceOwnerId && region && matchTypeFilter && priceType) {
      fetch();
    }
    return (): void => {
      ignore = true;
    };
  }, [sourceOwnerId, region, matchTypeFilter, priceType]);
  return [state as FetchState<PriceAnalysisItem[]>];
};

export default useCategoryPriceDistributionFetch;
