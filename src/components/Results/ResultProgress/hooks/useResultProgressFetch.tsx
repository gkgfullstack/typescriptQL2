import { useEffect, useReducer } from 'react';
import { ResultIndexResponse, getResultIndex } from 'src/api/rdDtlSummary';
import { FETCH_ACTION_TYPES, fetchReducer, FetchState } from 'src/reducers/fetchReducer';
import { ReportResultChart } from '../../ReportResult/ReportResultGraph';

const initialState: FetchState<ReportResultChart> = {
  loading: false,
  error: false,
  data: null,
};

const useResultProgressFetch = (runId:string): FetchState<Array<ReportResultChart>> => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    const fetch = async () => {
      dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
      try {
       const response: ResultIndexResponse = await getResultIndex(runId);
          
        dispatch({
          type: FETCH_ACTION_TYPES.setData,
          payload: { data: response.qualityPercentage },
        });
      } catch (e) {
        dispatch({ type: FETCH_ACTION_TYPES.setError, payload: { error: e } });
      }
    };
      fetch();
  },[runId]);
return state as FetchState<Array<ReportResultChart>>;
};

export default useResultProgressFetch;
