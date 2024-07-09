import { useEffect, useReducer } from 'react';
import { fetchReducer, FETCH_ACTION_TYPES, FetchState } from 'src/reducers/fetchReducer';
import {
  CompetitorVarianceResponse,
  getCompetitorVariance,
} from 'src/api/competitorVariance';
import CompetitorVariance from 'src/types/CompetitorVariance';

const initialState: FetchState<CompetitorVariance[]> = {
  loading: false,
  error: false,
  data: null,
};

const useCompetitorVariancessFetch = (sourceOwnerId:string, matchTypeFilter:string, region:string, priceType:string): [FetchState<CompetitorVariance[]>] => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  useEffect(() => {
    let ignore = false;
    const fetch = async () => {
      dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
      try {
        const response: CompetitorVarianceResponse = await getCompetitorVariance(sourceOwnerId, matchTypeFilter, region, priceType);
        if (!ignore) {
          dispatch({ type: FETCH_ACTION_TYPES.setData, payload: { data: response.competitorPriceVarianceList } });
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
  return [state as FetchState<CompetitorVariance[]>];
};

export default useCompetitorVariancessFetch;
