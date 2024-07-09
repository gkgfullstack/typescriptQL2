import { useEffect, useReducer } from 'react';
import { useAppDispatchContext, useAppStateContext } from 'src/stateProviders/useAppStateContext';
import { fetchReducer, FETCH_ACTION_TYPES, FetchState } from 'src/reducers/fetchReducer';
import { CompetitorsResponse, getCompetitors } from 'src/api/competitors';
import { ACTION_TYPES, AppState } from 'src/stateProviders/appStateProvider';
import Competitor from 'src/types/Competitor';

const initialState: FetchState<Competitor[]> = {
  loading: false,
  error: false,
  data: null,
};

const useCompetitorsFetching = (): [FetchState<Competitor[]>] => {
  const appDispatch = useAppDispatchContext();
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  const { competitors } = useAppStateContext();

  useEffect(() => {
    let ignore = false;
    const fetch = async () => {
      if (competitors === null && appDispatch) {
        dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
        try {
          const response: CompetitorsResponse = await getCompetitors();
          if (!ignore) {
            dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: false } });
            appDispatch({
              type: ACTION_TYPES.setCompetitorList,
              payload: { competitors: response.competitorList } as AppState,
            });
          }
        } catch (e) {
          if (!ignore) {
            dispatch({ type: FETCH_ACTION_TYPES.setError, payload: { error: e } });
          }
        }
      } else if (competitors !== null) {
        dispatch({ type: FETCH_ACTION_TYPES.setData, payload: { data: competitors } });
      }
    };
    fetch();
    return (): void => {
      ignore = true;
    };
  }, [competitors, appDispatch]);
  return [state as FetchState<Competitor[]>];
};

export default useCompetitorsFetching;
