import SiteNotificationType from 'src/types/SiteNotificationType';
//import { SiteNotificationAPIResponse, AppIdResponse } from 'src/api/siteNotifications';
import { AppIdResponse, getAppId } from 'src/api/siteNotificationsAppId';
import { useEffect, useReducer } from 'react';
import { FETCH_ACTION_TYPES, FetchState, fetchReducer } from 'src/reducers/fetchReducer';
//import useQueryUrlParams from 'src/hooks/useQueryUrlParams';
import { useSiteNotificationsStateContext } from 'src/stateProviders/useSiteNotificationsStateContext';

const initialState: FetchState<SiteNotificationType> = {
  loading: false,
  error: false,
  data: null,
};

const useAppIdSiteNotificationsFetching = (): FetchState<SiteNotificationType> => {
  const { vertical } = useSiteNotificationsStateContext();
  //let  { getAppIdandKey } = useQueryUrlParams();
  //let appidUndifined = getAppIdandKey !== undefined ? getAppIdandKey : '106';
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  useEffect(() => {
    const fetch = async () => {
      if (dispatch) {
        dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
        try {
          const response: AppIdResponse = await getAppId();
          const filters = response;
          // const responses: AppIdResponse = await getAppId();
          // const filterss = responses;

          // const customFilters = {
          //   ...filters,
          //   //...filterss,
          // };
                    
          dispatch({
            type: FETCH_ACTION_TYPES.setData,
            payload: { data: filters },
          });

        } catch (e) {
          dispatch({ type: FETCH_ACTION_TYPES.setError, payload: { error: e } });
        }
      }
    };
    fetch();

  }, [vertical]);

  return state as FetchState<SiteNotificationType>;
};

export default useAppIdSiteNotificationsFetching;
