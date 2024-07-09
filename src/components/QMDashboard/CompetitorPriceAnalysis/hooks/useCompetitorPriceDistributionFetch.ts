import { useEffect, useReducer } from 'react';
import { FETCH_ACTION_TYPES, FetchState, fetchReducer } from 'src/reducers/fetchReducer';
import {
  CompetitorPriceDistributionResponse,
  getCompetitorPriceDistribution,
} from 'src/api/competitiorPriceDistribution';
import PriceAnalysisItem from 'src/types/PriceAnalysisItem';

const initialState: FetchState<PriceAnalysisItem[]> = {
  loading: false,
  error: false,
  data: null,
};

const useCompetitorPriceDistributionFetch = (
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
        const response: CompetitorPriceDistributionResponse = await getCompetitorPriceDistribution(
          sourceOwnerId,
          matchTypeFilter,
          region,
          priceType
          );
        if (!ignore) {
          dispatch({ type: FETCH_ACTION_TYPES.setData, payload: { data: response.competitorPriceDistributionList } });
        }
      } catch (e) {
        if (!ignore) {
          dispatch({ type: FETCH_ACTION_TYPES.setError, payload: { error: e } });
        }
      }
    };
    if (sourceOwnerId && matchTypeFilter && region && priceType) {
      fetch();
    }
    return (): void => {
      ignore = true;
    };
  }, [sourceOwnerId, matchTypeFilter, region, priceType]);
  return [state as FetchState<PriceAnalysisItem[]>];
};

export default useCompetitorPriceDistributionFetch;
