import  SupportHelpType  from 'src/types/SupportHelpType';
import { useEffect, useReducer } from 'react';
import { FETCH_ACTION_TYPES, FetchState, fetchReducer } from 'src/reducers/fetchReducer';
import { useAppStateContext, useAppDispatchContext } from 'src/stateProviders/useAppStateContext';
import { ACTION_TYPES, AppState } from 'src/stateProviders/appStateProvider';
import { getSupportHelp, SupportHelpAPIResponse } from 'src/api/SupportHelpAPI';

const initialState: FetchState<SupportHelpType> = {
  loading: false,
  error: false,
  data: null,
};

const useSupportHelpFetching = (): FetchState<SupportHelpType> => {
  
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  const { supportHelpUpdate } = useAppStateContext();
  const dispatchDetailsContext = useAppDispatchContext();
  useEffect(() => {
    const fetch = async () => {
      if (dispatch) {
        dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
        try {
          const response: SupportHelpAPIResponse = await getSupportHelp();
          const responseSupportHelp = response ;
          
          dispatch({
            type: FETCH_ACTION_TYPES.setData,
            payload: {data: responseSupportHelp},
          });
          dispatchDetailsContext({
            type: ACTION_TYPES.setSupportHelp,
            payload: { supportHelpUpdate:false } as AppState,
          });

        } catch (e) {
          dispatch({ type: FETCH_ACTION_TYPES.setError, payload: { error: e } });
        }
      }
    };
    fetch();
    
  }, [supportHelpUpdate, dispatchDetailsContext]);

  return state as FetchState<SupportHelpType>;
};

export default useSupportHelpFetching;
