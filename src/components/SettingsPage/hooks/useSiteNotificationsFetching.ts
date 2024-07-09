import SiteNotificationType from 'src/types/SiteNotificationType';
import { getSiteNotificationAPI, SiteNotificationAPIResponse } from 'src/api/siteNotifications';
import { useEffect, useReducer } from 'react';
import { FETCH_ACTION_TYPES, FetchState, fetchReducer } from 'src/reducers/fetchReducer';
import { useAppStateContext } from 'src/stateProviders/useAppStateContext';
//import { useAppStateContext } from 'src/stateProviders/useAppStateContext';

const initialState: FetchState<SiteNotificationType> = {
  loading: false,
  error: false,
  data: null,
};

const useSiteNotificationsFetching = (): FetchState<SiteNotificationType> => {
  const vertical = useAppStateContext();
  let verticalGet2:any;
  let verticalGet = vertical.vertical === undefined ? '' : vertical.vertical;
  for(let i = 0; i < verticalGet.length; i++){
    verticalGet2 =  verticalGet[i]
  }
  console.log(verticalGet2, verticalGet)
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  useEffect(() => {
    const fetch = async () => {
      if (dispatch) {
        dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
        try {
          const response: SiteNotificationAPIResponse = await getSiteNotificationAPI(verticalGet);
          const siteNotificationsDataGet = response;
                      
          dispatch({
            type: FETCH_ACTION_TYPES.setData,
            payload: { data: siteNotificationsDataGet },
          });

        } catch (e) {
          dispatch({ type: FETCH_ACTION_TYPES.setError, payload: { error: e } });
        }
      }
    };
    fetch();

  }, [verticalGet]);

  return state as FetchState<SiteNotificationType>;
};

export default useSiteNotificationsFetching;


