import { useEffect, useReducer } from 'react';
import { useAppStateContext } from 'src/stateProviders/useAppStateContext';
import { fetchReducer, FETCH_ACTION_TYPES, FetchState } from 'src/reducers/fetchReducer';
import DashboardScheduled from 'src/types/DashboardScheduled';
import { getScheduled, ScheduledResponse } from 'src/api/dashboardScheduled';

const initialState: FetchState<DashboardScheduled[]> = {
  loading: false,
  error: false,
  data: null, 
};

const useScheduledFetch = (): [FetchState<DashboardScheduled>] => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  const { dashboardScheduled } = useAppStateContext();

  useEffect(() => {
    let ignore = false;
    const fetch = async () => {
      if (dashboardScheduled === null) {
        dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
        try {
          const response: ScheduledResponse = await getScheduled();
          if ( response) {
            dispatch({ type: FETCH_ACTION_TYPES.setData, payload: { data: response } });
          }        
        } catch (e) {
          if (!ignore) {
            dispatch({ type: FETCH_ACTION_TYPES.setError, payload: { error: e } });
          }
        }
      } else if (dashboardScheduled !== null) { 
    }
    };
    fetch();
    return (): void => {
      ignore = true;
    };
  }, [dashboardScheduled]);
  return [state as FetchState<DashboardScheduled>];
};

export default useScheduledFetch;
