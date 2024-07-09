import { useEffect, useReducer } from 'react';
import { getSummaryCircleChart, SummaryCircleResponse } from 'src/api/rdDtlSummary';
import { FETCH_ACTION_TYPES, fetchReducer, FetchState } from 'src/reducers/fetchReducer';
import { SummaryCircleChartGraph } from '../ResultCircleChartGraph';
import {
  SUMMARYCIRCLE_ACTION_TYPES,
  SummaryCircleChartAction,
  summaryCircleChartReducer,
  SummaryCircleChartState
} from '../../reducers/summaryCircleChartReducer';
import { sortArrByProp } from 'src/utils';


const initialState: SummaryCircleChartState = {
  loading: false,
  error: false,
  data: null,
  inputList: null,
  outputList: null,
  completed: '',
  completedOut:'',
};

const useResultCircleChartFetch = (runId: string): FetchState<Array<SummaryCircleChartGraph>> => {
  const [state, dispatch] = useReducer(
    (state: SummaryCircleChartState, action: SummaryCircleChartAction) => {
      const fetchState: SummaryCircleChartState = fetchReducer(state, action) as SummaryCircleChartState;
      return summaryCircleChartReducer({ ...fetchState }, action);
    },
    { ...initialState}
  );
  
  useEffect(() => {
    const fetch = async () => {
      if (dispatch) {
        dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
        try {
          const { inputList:inputData,outputList:outputData, completed, completedOut }: SummaryCircleResponse = await getSummaryCircleChart(runId);
          const refactoringData = (inputData || [])
          .sort(sortArrByProp('sortOrder'))
          .map(elem => ({
            ...elem,
            key: elem.item + '&' + elem.count,
            value: +elem.percent,
          }));
          const refactoringData1 = (outputData || [])
          .sort(sortArrByProp('sortOrder'))
          .map(elem => ({
            ...elem,
            key: elem.item + '&' + elem.count,
            value: +elem.percent,
          }));
          dispatch({
            type: SUMMARYCIRCLE_ACTION_TYPES.setData,
            payload: { inputList: refactoringData,outputList: refactoringData1, completed, completedOut },
          });
        } catch (e) {
          dispatch({ type: FETCH_ACTION_TYPES.setError, payload: { error: e } });
        }
      }
    };
    fetch();
  }, [runId]);

  return state as FetchState<Array<SummaryCircleChartGraph>>;
};

export default useResultCircleChartFetch;
