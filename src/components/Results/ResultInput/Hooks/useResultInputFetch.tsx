import { useEffect, useReducer } from 'react';
import { fetchReducer, FETCH_ACTION_TYPES, FetchState } from 'src/reducers/fetchReducer';
import DashboardLowQuality from 'src/types/ResultInput';
import { getResultInput, ResultInputResponse } from 'src/api/rdDtlSummary';

const initialState: FetchState<DashboardLowQuality[]> = {
  loading: false,
  error: false,
  data: null, 
};

const useResultInputFetch = (runId:string): [FetchState<DashboardLowQuality>] => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    let ignore = false;
    const fetch = async () => {
      if (runId) {
        dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
        try {
          const response: ResultInputResponse = await getResultInput(runId);
          if ( response) {
            dispatch({ type: FETCH_ACTION_TYPES.setData, payload: { data: response } });
          }        
        } catch (e) {
          if (!ignore) {
            dispatch({ type: FETCH_ACTION_TYPES.setError, payload: { error: e } });
          }
        }
      } 
    };
    fetch();
    return (): void => {
      ignore = true;
    };
  }, [runId]);
  return [state as FetchState<DashboardLowQuality>];
};

export default useResultInputFetch;
