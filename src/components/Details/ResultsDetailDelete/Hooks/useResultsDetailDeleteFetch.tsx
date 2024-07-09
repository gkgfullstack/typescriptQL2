import { useEffect, useReducer } from 'react';
import { fetchReducer, FETCH_ACTION_TYPES, FetchState } from 'src/reducers/fetchReducer';
//import DashboardLowQuality from 'src/types/ResultInput';
import { getDeleterow  } from 'src/api/rdDtlSummary';

export type DeleterowResponse = {
  message: string;
};
const initialState: FetchState<DeleterowResponse[]> = {
  loading: false,
  error: false,
  data: null, 
};

const useResultDetailDeleteFetch = (runId:string): [FetchState<DeleterowResponse>] => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    let ignore = false;
    const fetch = async () => {
      if (runId) {
        dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
        try {
          const response: DeleterowResponse = await getDeleterow(runId);
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
  return [state as FetchState<DeleterowResponse>];
};

export default useResultDetailDeleteFetch;
