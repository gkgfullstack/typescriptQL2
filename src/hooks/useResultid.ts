import { useEffect, useReducer } from 'react';
import { useAppDispatchContext, useAppStateContext } from 'src/stateProviders/useAppStateContext';
import { fetchReducer, FETCH_ACTION_TYPES, FetchState } from 'src/reducers/fetchReducer';
import { getResultlist, ResultlistResponse } from 'src/api/rdDtlSummary';
import { ACTION_TYPES, AppState } from 'src/stateProviders/appStateProvider';
import FileTableResultType from 'src/types/FileTableResultType';
//import { getResultlist } from 'src/api/fileTableResult';

const initialState: FetchState<FileTableResultType[]> = {
  loading: false,
  error: false,
  data: null,
};

const useResultid = (
  offset: any,
  size:any,
  sorting:any,
  runId: any,
  ): [FetchState<FileTableResultType[]>] => {
  const appDispatch = useAppDispatchContext();
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  const { resultid } = useAppStateContext();

  useEffect(() => {
    let ignore = false;
    const fetch = async () => {
      if (resultid === null && appDispatch) {
        dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
        try {
          const { resultList: data }:ResultlistResponse = await getResultlist(
            offset,
            size,
            sorting,
            runId
            );
          if (!ignore) {
            dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: false } });
            appDispatch({
              type: ACTION_TYPES.setResultList,
              payload: { resultList: data } as unknown as AppState,
            });
          }
        } catch (e) {
          if (!ignore) {
            dispatch({ type: FETCH_ACTION_TYPES.setError, payload: { error: e } });
          }
        }
      } else if (resultid !== null) {
        dispatch({ type: FETCH_ACTION_TYPES.setData, payload: { data: resultid } });
      }
    };
    fetch();
    return (): void => {
      ignore = true;
    };
  }, [resultid, appDispatch]);
  return [state as FetchState<FileTableResultType[]>];
};

export default useResultid;
