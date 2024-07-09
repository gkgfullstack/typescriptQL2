import { useEffect, useReducer } from 'react';
import { useAppStateContext } from 'src/stateProviders/useAppStateContext';
import { fetchReducer, FETCH_ACTION_TYPES, FetchState } from 'src/reducers/fetchReducer';
import DashboardReports from 'src/types/DashboardReports';
import { getReports, ReportsResponse } from 'src/api/dashboardReports';

const initialState: FetchState<DashboardReports[]> = {
  loading: false,
  error: false,
  data: null, 
};

const useReportsFetch = (): [FetchState<DashboardReports>] => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  const { dashboardReports } = useAppStateContext();

  useEffect(() => {
    let ignore = false;
    const fetch = async () => {
      if (dashboardReports === null) {
        dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
        try {
          const response: ReportsResponse = await getReports();
          if ( response) {
            dispatch({ type: FETCH_ACTION_TYPES.setData, payload: { data: response } });
          }        
        } catch (e) {
          if (!ignore) {
            dispatch({ type: FETCH_ACTION_TYPES.setError, payload: { error: e } });
          }
        }
      } else if (dashboardReports !== null) { 
    }
    };
    fetch();
    return (): void => {
      ignore = true;
    };
  }, [dashboardReports]);
  return [state as FetchState<DashboardReports>];
};

export default useReportsFetch;
