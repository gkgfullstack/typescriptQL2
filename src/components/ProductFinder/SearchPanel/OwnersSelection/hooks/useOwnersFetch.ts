import { useEffect, useReducer } from 'react';
import { useAppDispatchContext, useAppStateContext } from 'src/stateProviders/useAppStateContext';
import { fetchReducer, FETCH_ACTION_TYPES, FetchState } from 'src/reducers/fetchReducer';
import { ACTION_TYPES, AppState } from 'src/stateProviders/appStateProvider';
import Owner from 'src/types/Owner';
import { getOwners, OwnersResponse } from 'src/api/owners';

const initialState: FetchState<Owner[]> = {
  loading: false,
  error: false,
  data: null,
};

const useOwnersFetch = (): [FetchState<Owner[]>] => {
  const appDispatch = useAppDispatchContext();
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  const { owners } = useAppStateContext();

  useEffect(() => {
    let ignore = false;
    const fetch = async () => {
      if (owners === null && appDispatch) {
        dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
        try {
          const response: OwnersResponse = await getOwners();
          if (!ignore) {
            dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: false } });
            appDispatch({
              type: ACTION_TYPES.setOwnerList,
              payload: { owners: response.sourceOwner } as AppState,
            });
          }
        } catch (e) {
          if (!ignore) {
            dispatch({ type: FETCH_ACTION_TYPES.setError, payload: { error: e } });
          }
        }
      } else if (owners !== null) {
        dispatch({ type: FETCH_ACTION_TYPES.setData, payload: { data: owners } });
      }
    };
    fetch();
    return (): void => {
      ignore = true;
    };
  }, [owners, appDispatch]);
  return [state as FetchState<Owner[]>];
};

export default useOwnersFetch;
