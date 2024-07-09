import SettingType from 'src/types/SettingType';
import { SettingsAPIResponse } from 'src/api/SettingsAPI';
import { getSettingsAPI, getSettingsGeneralAPI } from 'src/api/SettingsAPI';
import { useEffect, useReducer } from 'react';
import { FETCH_ACTION_TYPES, FetchState, fetchReducer } from 'src/reducers/fetchReducer';
import { useAppStateContext, useAppDispatchContext } from 'src/stateProviders/useAppStateContext';
import { ACTION_TYPES, AppState } from 'src/stateProviders/appStateProvider';

const initialState: FetchState<SettingType> = {
  loading: false,
  error: false,
  data: null,
};

const useSettingsFetching = (): FetchState<SettingType> => {

  const [state, dispatch] = useReducer(fetchReducer, initialState);
  const { supportHelpUpdate } = useAppStateContext();
  const dispatchDetailsContext = useAppDispatchContext();
  useEffect(() => {
    const fetch = async () => {
      if (dispatch) {
        dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
        try {
          const response: SettingsAPIResponse = await getSettingsAPI();
          const filters = response;
          const responses: SettingsAPIResponse = await getSettingsGeneralAPI();
          const filterss = responses;
          // const responsess: SettingsAPIResponse = await getSettingsEmailAPI();
          // const filtersss = responsess;

          const customFilters = {
            ...filters,
            ...filterss,
            //...filtersss,
          };
                    
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

  return state as FetchState<SettingType>;
};

export default useSettingsFetching;
