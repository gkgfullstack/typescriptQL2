import SiteNotificationType from 'src/types/SiteNotificationType';
import { useEffect, useReducer } from 'react';
import { FETCH_ACTION_TYPES, FetchState, fetchReducer } from 'src/reducers/fetchReducer';
import { getTopSiteNotificationAPI, TopSiteNotificationAPIResponse } from 'src/api/topSiteNotifications';

const initialState: FetchState<SiteNotificationType> = {
  loading: false,
  error: false,
  data: null,
};

const useTopSiteNotificationsFetching = (): FetchState<SiteNotificationType> => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  useEffect(() => {
    const fetch = async () => {
      if (dispatch) {
        dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
        try {
          const response: TopSiteNotificationAPIResponse = await getTopSiteNotificationAPI();
          const customFilters = response;
                    
          dispatch({
            type: FETCH_ACTION_TYPES.setData,
            payload: { data: customFilters },
          });

        } catch (e) {
          dispatch({ type: FETCH_ACTION_TYPES.setError, payload: { error: e } });
        }
      }
    };
    fetch();

  }, []);

  return state as FetchState<SiteNotificationType>;
};

export default useTopSiteNotificationsFetching;
