import { useEffect, useReducer } from 'react';
import { ReportResultResponse, getReportResult } from 'src/api/rdDtlSummary';
import { FETCH_ACTION_TYPES, fetchReducer, FetchState } from 'src/reducers/fetchReducer';
import { sortArrByProp } from 'src/utils';
import { ReportResultChart } from '../ReportResultGraph';

const initialState: FetchState<ReportResultChart> = {
  loading: false,
  error: false,
  data: null,
};

const useReportResultFetch = (runId: string): FetchState<Array<ReportResultChart>> => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    const fetch = async () => {
      dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
      try {
        const distribution: ReportResultResponse = await getReportResult(runId);
        const refactoringData = (distribution.ReportPojo)
          .sort(sortArrByProp('sortOrder'))
          .map(elem => ({
            ...elem,
            key: elem.date,
            value: +elem.scriptcount,
          }));
        dispatch({
          type: FETCH_ACTION_TYPES.setData,
          payload: { data: refactoringData },
        });
      } catch (e) {
        dispatch({ type: FETCH_ACTION_TYPES.setError, payload: { error: e } });
      }
    };
    fetch();
  }, [runId]);
  return state as FetchState<Array<ReportResultChart>>;
};

export default useReportResultFetch;
