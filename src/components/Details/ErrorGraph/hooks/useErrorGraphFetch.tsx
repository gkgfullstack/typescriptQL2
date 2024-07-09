import { useEffect, useReducer } from 'react';
import { FETCH_ACTION_TYPES, fetchReducer, FetchState } from 'src/reducers/fetchReducer';
import { sortArrByProp } from 'src/utils';
import { ErrorGraphChart } from '../ErrorGraph';
import { getErrorChart, ErrorLabelResponse } from 'src/api/rdDtlSummary';

const initialState: FetchState<ErrorGraphChart> = {
  loading: false,
  error: false,
  data: null,
};

const useErrorGraphFetch = (runId: string): FetchState<Array<ErrorGraphChart>> => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    const fetch = async () => {
      dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
      try {
        const distribution: ErrorLabelResponse = await getErrorChart(runId);
        const refactoringData = (distribution.ErrorList || [])
          .sort(sortArrByProp('sortOrder'))
          .map(elem => ({
            ...elem,
            key: elem.type + '&' + elem.errorname,
            value: +elem.errorcount,
          }));
        dispatch({
          type: FETCH_ACTION_TYPES.setData,
          payload: { data: refactoringData },
        });
      } catch (e) {
        dispatch({ type: FETCH_ACTION_TYPES.setError, payload: { error: e } });
      }
    };
    if (runId) {
      fetch();
    }
  }, [runId]);

  return state as FetchState<Array<ErrorGraphChart>>;
};

export default useErrorGraphFetch;
