import { useEffect, useReducer } from 'react';
import { useAppStateContext } from 'src/stateProviders/useAppStateContext';
import { fetchReducer, FETCH_ACTION_TYPES, FetchState } from 'src/reducers/fetchReducer';
import DashboardLowQuality from 'src/types/DashboardLowQuality';
import { getLowQuality, LowQualityResponse } from 'src/api/dashboardLowQuality';

const initialState: FetchState<DashboardLowQuality[]> = {
  loading: false,
  error: false,
  data: null, 
};

const useLowQualityFetch = (): [FetchState<DashboardLowQuality>] => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  const { dashboardLowQuality } = useAppStateContext();
  let  bAdminMode:boolean=false;
  let input = localStorage.getItem("bAdminMode");
  bAdminMode = (input === 'true');
  useEffect(() => {
    let ignore = false;
    const fetch = async () => {
      if (dashboardLowQuality === null) {
        dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
        try {
          const response: LowQualityResponse = await getLowQuality(bAdminMode);
          if ( response) {
            dispatch({ type: FETCH_ACTION_TYPES.setData, payload: { data: response } });
          }        
        } catch (e) {
          if (!ignore) {
            dispatch({ type: FETCH_ACTION_TYPES.setError, payload: { error: e } });
          }
        }
      } else if (dashboardLowQuality !== null) { 
    }
    };
    fetch();
    return (): void => {
      ignore = true;
    };
  }, [dashboardLowQuality]);
  return [state as FetchState<DashboardLowQuality>];
};

export default useLowQualityFetch;
