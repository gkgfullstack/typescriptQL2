import { useEffect, useReducer } from 'react';
import { CompetitorVarianceResponse } from 'src/api/competitorVariance';
import { FETCH_ACTION_TYPES, fetchReducer, FetchState } from 'src/reducers/fetchReducer';
import { getCompetitorVariance} from 'src/api/competitorVariance';
import { CompetitorVarianceChart } from '../CompetitorVarianceGraph';

const initialState: FetchState<CompetitorVarianceChart> = {
  loading: false,
  error: false,
  data: null,
};

const useCompetitorVarianceFetch = (sourceOwnerId: string, matchTypeFilter:string, region:string, priceType:string): FetchState<Array<CompetitorVarianceChart>> => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    const fetch = async () => {
      dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
      try {
        const distribution: CompetitorVarianceResponse = await getCompetitorVariance(sourceOwnerId, matchTypeFilter, region, priceType);
        const refactoringData = (distribution.competitorPriceVarianceList || [])
          //.sort(sortArrByProp('sortOrder'))
          .map(elem => ({
            ...elem,
            key: elem.competitorName,
            value: elem.value,
            start: elem.start,
          }));
        dispatch({
          type: FETCH_ACTION_TYPES.setData,
          payload: { data: refactoringData },
        });
      } catch (e) {
        dispatch({ type: FETCH_ACTION_TYPES.setError, payload: { error: e } });
      }
    };
    if (sourceOwnerId && matchTypeFilter && region && priceType) {
      fetch();
    }
  }, [sourceOwnerId, matchTypeFilter, region, priceType]);

  return state as FetchState<Array<CompetitorVarianceChart>>;
};

export default useCompetitorVarianceFetch;
