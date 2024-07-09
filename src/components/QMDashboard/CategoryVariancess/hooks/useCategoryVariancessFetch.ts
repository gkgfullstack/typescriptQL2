import { useEffect, useReducer } from 'react';
import { fetchReducer, FETCH_ACTION_TYPES, FetchState } from 'src/reducers/fetchReducer';
import {
  CategoryVarianceResponse,
  getCategoryVariance,
} from 'src/api/categoryVariance';
import CategoryVariance from 'src/types/CategoryVariance';

const initialState: FetchState<CategoryVariance[]> = {
  loading: false,
  error: false,
  data: null,
};

const useCategoryVariancessFetch = (sourceOwnerId:string, matchTypeFilter:string, region:string, priceType:string): [FetchState<CategoryVariance[]>] => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  useEffect(() => {
    let ignore = false;
    const fetch = async () => {
      dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
      try {
        const response: CategoryVarianceResponse = await getCategoryVariance(sourceOwnerId, matchTypeFilter, region, priceType);
        if (!ignore) {
          dispatch({ type: FETCH_ACTION_TYPES.setData, payload: { data: response.categoryPriceVarianceList } });
        }
      } catch (e) {
        if (!ignore) {
          dispatch({ type: FETCH_ACTION_TYPES.setError, payload: { error: e } });
        }
      }
    };
    fetch();
    return (): void => {
      ignore = true;
    };
  }, [sourceOwnerId, matchTypeFilter, region, priceType]);
  return [state as FetchState<CategoryVariance[]>];
};

export default useCategoryVariancessFetch;
