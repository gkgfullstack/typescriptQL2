
import { useReducer } from 'react';
import { FETCH_ACTION_TYPES, fetchReducer, FetchState } from 'src/reducers/fetchReducer';
import { siteNotificationsAPIPost, SiteNotificationsPostResponse } from 'src/api/siteNotificationsAPIPost';
import  SiteNotificationType  from 'src/types/SiteNotificationType';
import {
  notification,
  message
} from 'antd';
import { SiteNotificationsState, SITENOTIFICATIONS_ACTION_TYPES } from 'src/stateProviders/siteNotificationsStateProvider';
import { useSiteNotificationsDispatchContext } from 'src/stateProviders/useSiteNotificationsStateContext';

const initialState: FetchState<SiteNotificationType> = {
  loading: false,
  error: false,
  data: null,
};
export type SiteNotificationsRequest = { 
  optMode: File;
  emailAddresses:string; 
  siteNotificationList: string; 
};
export type JobNameDispatch = {
  SiteNotificationData: (values:any,form:any) => void;
};

const useSiteNotificationsPostFetch = (): [FetchState<SiteNotificationsPostResponse>, JobNameDispatch] => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  const dispatchDetailsContext = useSiteNotificationsDispatchContext();
  return [
    state as FetchState<SiteNotificationsPostResponse>,
    {
      SiteNotificationData: async (values) => {
        dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
        try {
          const response: SiteNotificationsPostResponse = await siteNotificationsAPIPost(values);
           if (response!==undefined ) {
            
            if(response){
              message
              .loading('Action in progress..', 1.5)
              const args = {
                message: response,                
                duration: 2.5,
              };
              notification.open(args);
           
            dispatchDetailsContext({
              type: SITENOTIFICATIONS_ACTION_TYPES.setPostSiteNotifications,
              payload: {SiteNotificationData:'' } as SiteNotificationsState,
            });
          }}         
        } catch (e) {
          dispatch({ type: FETCH_ACTION_TYPES.setError, payload: { error: e } });
        }
      },
    },
  ];
};

export default useSiteNotificationsPostFetch;


