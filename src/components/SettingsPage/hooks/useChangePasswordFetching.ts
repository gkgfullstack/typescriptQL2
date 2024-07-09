import ChangePasswordGetType from 'src/types/ChangePasswordGetType';
import { ChangePasswordAPIResponse } from 'src/api/ChangePasswordGet';
import { getChangePasswordAPI } from 'src/api/ChangePasswordGet';
import { useEffect, useReducer } from 'react';
import { FETCH_ACTION_TYPES, FetchState, fetchReducer } from 'src/reducers/fetchReducer';
import { useAppStateContext, useAppDispatchContext } from 'src/stateProviders/useAppStateContext';
import { ACTION_TYPES, AppState } from 'src/stateProviders/appStateProvider';

const initialState: FetchState<ChangePasswordGetType> = {
  loading: false,
  error: false,
  data: null,
};

const useChangePasswordFetching = (): FetchState<ChangePasswordGetType> => {

  const [state, dispatch] = useReducer(fetchReducer, initialState);
  const { supportHelpUpdate } = useAppStateContext();
  const dispatchDetailsContext = useAppDispatchContext();
  useEffect(() => {
    const fetch = async () => {
      if (dispatch) {
        dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
        try {
          const response: ChangePasswordAPIResponse = await getChangePasswordAPI();
          const filters = response;
          console.log('filters========================,,,,,,', filters)
           // const responsess: SettingsAPIResponse = await getSettingsEmailAPI();
          // const filtersss = responsess;

          const customFilters = {
            ...filters,
            //...filtersss,
          };

          console.log('customFilters===========', customFilters)
          dispatch({
            type: FETCH_ACTION_TYPES.setData,
            payload: { data: customFilters },
          });
          dispatchDetailsContext({
            type: ACTION_TYPES.setSupportHelp,
            payload: { supportHelpUpdate: false } as AppState,
          });

        } catch (e) {
          dispatch({ type: FETCH_ACTION_TYPES.setError, payload: { error: e } });
        }
      }
    };
    fetch();

  }, [supportHelpUpdate, dispatchDetailsContext]);

  return state as FetchState<ChangePasswordGetType>;
};

export default useChangePasswordFetching;
