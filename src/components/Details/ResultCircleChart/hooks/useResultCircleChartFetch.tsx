import { useEffect, useReducer } from 'react';
import { SummaryCircleResponse, getSummaryCircleChart } from 'src/api/rdDtlSummary';
import { FETCH_ACTION_TYPES, fetchReducer, FetchState } from 'src/reducers/fetchReducer';
import { ResultCircleChartGraph } from '../ResultCircleChartGraph';
//import { SummaryCircleChartGraph } from '../SummaryCircleChartGraph';

const initialState: FetchState<ResultCircleChartGraph> = {
  loading: false,
  error: false,
  data: null,
};

const useResultCircleChartFetch = (runId:string): FetchState<Array<ResultCircleChartGraph>> => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    const fetch = async () => {
      if (runId) {
      dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
      }
      try {
        const response: SummaryCircleResponse = await getSummaryCircleChart(runId);
        dispatch({
          type: FETCH_ACTION_TYPES.setData,
          payload: { inputData: response.inputList,outputData: response.outputList},
        });
      } catch (e) {
        dispatch({ type: FETCH_ACTION_TYPES.setError, payload: { error: e } });
      }
    };
      fetch();
  },[runId]);
  return state as FetchState<Array<ResultCircleChartGraph>>;
};
export default useResultCircleChartFetch;
