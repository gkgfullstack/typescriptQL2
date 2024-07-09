import { useEffect, useReducer } from 'react';
import { PriceDistributionResponse } from 'src/api/priceDistribution';
import { FETCH_ACTION_TYPES, fetchReducer, FetchState } from 'src/reducers/fetchReducer';
import { getPriceDistribution } from 'src/api/priceDistribution';
import { sortArrByProp } from 'src/utils';
import { PriceDistributionChart } from '../PriceDistributionGraph';

const initialState: FetchState<PriceDistributionChart> = {
  loading: false,
  error: false,
  data: null,
};

const usePriceDistributionFetch = (sourceOwnerId: string, matchTypeFilter:string, region:string, priceType:string): FetchState<Array<PriceDistributionChart>> => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    const fetch = async () => {
      dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
      try {
        const distribution: PriceDistributionResponse = await getPriceDistribution(sourceOwnerId, matchTypeFilter, region, priceType);
        const refactoringData = (distribution.priceDistributionList || [])
          .sort(sortArrByProp('sortOrder'))
          .map(elem => ({
            ...elem,
            key: elem.type + '&' + elem.label,
            value: +elem.value,
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

  return state as FetchState<Array<PriceDistributionChart>>;
};

export default usePriceDistributionFetch;
