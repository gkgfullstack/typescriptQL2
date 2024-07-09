
import { useReducer } from 'react';
import { FETCH_ACTION_TYPES, fetchReducer, FetchState } from 'src/reducers/fetchReducer';
import { SettingsPostResponse } from 'src/api/settingAPIPost';
import { updateSettings } from 'src/api/settingAPIPost';
import  SettingTypePost  from 'src/types/SettingTypePost';
import { SearchDetailsState, SEARCH_DETAILS_ACTION_TYPES } from 'src/stateProviders/searchDetailsStateProvider';
import { useSearchDetailsDispatchContext } from 'src/stateProviders/useSearchDetailsStateContext';
import {
  notification,
  message
} from 'antd';
const initialState: FetchState<SettingTypePost> = {
  loading: false,
  error: false,
  data: null,
};

export type JobNameDispatch = {
  settingsUpdatedsss: (values:any,fromPage:string,form:any, id:any) => void;
};

const useSettingsPostFetch = (): [FetchState<SettingsPostResponse>, JobNameDispatch] => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  const dispatchDetailsContext = useSearchDetailsDispatchContext();
  return [
    state as FetchState<SettingsPostResponse>,
    {
      settingsUpdatedsss: async (values) => {
        console.log("SearchNameRequest==", values);
        dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
        try {
          const response: SettingsPostResponse = await updateSettings(values);
           if (response!==undefined ) {
            if(response){
              //alert(response);
              message
              .loading('Action in progress..', 1.5)
              const args = {
                message: response,                
                duration: 0,
              };
              notification.open(args);
           
            dispatchDetailsContext({
              type: SEARCH_DETAILS_ACTION_TYPES.setSettingsPost,
              payload: { settingsUpdated:true } as SearchDetailsState,
            });
          }}          
        } catch (e) {
          dispatch({ type: FETCH_ACTION_TYPES.setError, payload: { error: e } });
        }
      },
    },
  ];
};

export default useSettingsPostFetch;


