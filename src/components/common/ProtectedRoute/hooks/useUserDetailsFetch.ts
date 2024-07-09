import ProductInfo from 'src/types/ProductInfo';
import { useEffect, useReducer } from 'react';
import { useAppDispatchContext } from 'src/stateProviders/useAppStateContext';
import { FETCH_ACTION_TYPES, fetchReducer, FetchState } from 'src/reducers/fetchReducer';
import { getUserDetails, UserDetailsResponse } from 'src/api/userDetails';
import { ACTION_TYPES } from 'src/stateProviders/appStateProvider';
import auth from 'src/services/auth';
import UserContex from 'src/services/UserContex'; 

const initialState: FetchState<ProductInfo> = {
  loading: false,
  error: false,
  data: null,
};

const useUserDetailsFetch = (token?: string): [FetchState<UserDetailsResponse>] => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  const appDispatch = useAppDispatchContext();

  useEffect(() => {
    let ignore = false;
    const fetch = async () => {
      if (token && appDispatch ) {
        dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
        try {
          const response: UserDetailsResponse = await getUserDetails(token);
          if (!response) {
            throw new Error(`Can't get user info`);
          }
          if (!ignore && response) {
            dispatch({ type: FETCH_ACTION_TYPES.setData, payload: { data: response } });
            auth.setUserId(response.userId);            
            UserContex.setTimeZone(response.timeZone);
            UserContex.setDateFormat(response.dateFormat);
            UserContex.setBaseUrl(response.baseURL);            
            localStorage.setItem('pendoUserId', response.pendoUserId);
            localStorage.setItem('changePasswordFlag', response.changePasswordFlag);
            let accountId=""+response.accountId;
            localStorage.setItem('accountId', accountId);
            localStorage.setItem('orgId', ""+response.orgId);
            localStorage.setItem('orgName', response.orgName);
            localStorage.setItem('environment', response.environment); 
            localStorage.setItem('crmName', response.crm_name);
            localStorage.setItem('hasAppAdminPriv', String(response.hasAppAdminPriv));
            appDispatch({ type: ACTION_TYPES.setUserDetails, payload: response });
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
  }, [token, appDispatch]);
  return [state as FetchState<UserDetailsResponse>];
};

export default useUserDetailsFetch;
