import { useEffect, useReducer } from 'react';
import { useAppStateContext } from 'src/stateProviders/useAppStateContext';
import { fetchReducer, FETCH_ACTION_TYPES, FetchState } from 'src/reducers/fetchReducer';
import DashboardActive from 'src/types/DashboardActive';
import { getDashboard, DashboardResponse } from 'src/api/dashboardActive';

const initialState: FetchState<DashboardActive[]> = {
  loading: false,
  error: false,
  data: null, 
};

const useDashboardFetch = (): [FetchState<DashboardActive>] => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  const { dashboardRunning } = useAppStateContext();
  let  bAdminMode:boolean=false;
  let input = localStorage.getItem("bAdminMode");
  bAdminMode = (input === 'true');
  useEffect(() => {
    let ignore = false;
    const fetch = async () => {
      if (dashboardRunning === null) {
        dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
        try {
          const response: DashboardResponse = await getDashboard(bAdminMode);
          if ( response) {
            dispatch({ type: FETCH_ACTION_TYPES.setData, payload: { data: response } });
          }        
        } catch (e) {
          if (!ignore) {
            dispatch({ type: FETCH_ACTION_TYPES.setError, payload: { error: e } });
          }
        }
      } else if (dashboardRunning !== null) { 
    }
    };
    fetch();
    return (): void => {
      ignore = true;
    };
  }, [dashboardRunning]);
  return [state as FetchState<DashboardActive>];
};

export default useDashboardFetch;
