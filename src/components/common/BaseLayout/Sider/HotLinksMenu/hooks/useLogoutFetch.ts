import ProductInfo from 'src/types/ProductInfo';
import { useReducer } from 'react';
import { useAppDispatchContext } from 'src/stateProviders/useAppStateContext';
import { FETCH_ACTION_TYPES, fetchReducer, FetchState } from 'src/reducers/fetchReducer';
import { ACTION_TYPES } from 'src/stateProviders/appStateProvider';
import { logout } from 'src/api/logout';
import { ResponseHeader } from 'src/types/ResponseHeader';

const initialState: FetchState<ProductInfo> = {
  loading: false,
  error: false,
  data: null,
};

export type LogoutDispatch = {
  logout: () => void;
};

const useLogoutFetch = (): [FetchState<ResponseHeader>, LogoutDispatch] => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  const appDispatch = useAppDispatchContext();
  return [
    state as FetchState<ResponseHeader>,
    {
      logout: async () => {
        if (appDispatch) {
          dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
          try {
            const response: ResponseHeader = await logout();
            if (response) {
              dispatch({ type: FETCH_ACTION_TYPES.setData, payload: { data: response } });
              appDispatch({ type: ACTION_TYPES.cleanupUserDetails });
            }
          } catch (e) {
            dispatch({ type: FETCH_ACTION_TYPES.setError, payload: { error: e } });
          }
        }
      },
    },
  ];
};

export default useLogoutFetch;
