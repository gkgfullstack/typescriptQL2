import { useEffect, useReducer } from 'react';
import { useAppDispatchContext, useAppStateContext } from 'src/stateProviders/useAppStateContext';
import { fetchReducer, FETCH_ACTION_TYPES, FetchState } from 'src/reducers/fetchReducer';
import { ACTION_TYPES, AppState } from 'src/stateProviders/appStateProvider';
import ApplicationFilterType from 'src/types/ApplicationFilterType';
import { getAppId, AppIdResponse } from 'src/api/applicationFilter';

const initialState: FetchState<ApplicationFilterType[]> = {
  loading: false,
  error: false,
  data: null,
};

const useSelectVerticalFetch = (): [FetchState<ApplicationFilterType[]>] => {
  const appDispatch = useAppDispatchContext();
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  const { appId } = useAppStateContext();

  useEffect(() => {
    let ignore = false;
    const fetch = async () => {
      if (appId === null && appDispatch) {
        dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
        try {
          const response: AppIdResponse = await getAppId();
          if (!ignore) {
            dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: false } });
            appDispatch({
              type: ACTION_TYPES.setApplicationList,
              payload: { appId: response.vertical } as unknown as AppState,
            });
          }
        } catch (e) {
          if (!ignore) {
            dispatch({ type: FETCH_ACTION_TYPES.setError, payload: { error: e } });
          }
        }
      } else if (appId !== null) {
        dispatch({ type: FETCH_ACTION_TYPES.setData, payload: { data: appId } });
      }
    };
    fetch();
    return (): void => {
      ignore = true;
    };
  }, [appId, appDispatch]);
  return [state as FetchState<ApplicationFilterType[]>];
};

export default useSelectVerticalFetch;
