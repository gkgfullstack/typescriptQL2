import { useEffect, useReducer } from 'react';
import { getResultlist, ResultlistResponse } from 'src/api/rdDtlSummary';
import { FETCH_ACTION_TYPES, fetchReducer } from 'src/reducers/fetchReducer'; 
import FileTableResultType from 'src/types/FileTableResultType';
import { Sorting } from 'src/types/Sorting';
import {
  FILES_LIST_ACTION_TYPES,
  FilesResultsTableListAction,
  filesresultsTableListReducer,
  FilesResultsTableListState,
} from '../../reducers/filesTableListReducer';

const initialState: FilesResultsTableListState = {
  loading: false,
  error: false,
  data: null,
  total: 0,
  page: 1,
  offset: 1,
  size: 0,
  sorting: null,
  resultList: '',
};

const useFilesTableFetch = (
  initialSorting: Sorting<FileTableResultType>,
  initialPage: number,
  initialSize: number,
  runId: string
): FilesResultsTableListState => {
  const [state, dispatch] = useReducer(
    (state: FilesResultsTableListState, action: FilesResultsTableListAction) => {
      const fetchState: FilesResultsTableListState = fetchReducer(state, action) as FilesResultsTableListState;
      return filesresultsTableListReducer({ ...fetchState }, action);
    },
    { ...initialState, sorting: initialSorting, size: initialSize }
  );
  const { offset, page, size, sorting } = state;

  useEffect(() => {
    if (initialSorting && initialSize && initialPage) {
      dispatch({
        type: FILES_LIST_ACTION_TYPES.updateOptions,
        payload: { sorting: initialSorting, size: initialSize, page: initialPage },
      });
    }
  }, [initialSorting, initialSize, initialPage]);
  useEffect(() => {
    const fetch = async () => {
      if (runId) {
        dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
        try {
          const { resultList: data }: ResultlistResponse = await getResultlist(
            offset,
            size,
            sorting,
            runId
          );
          dispatch({
            type: FILES_LIST_ACTION_TYPES.setResultsTable,
            payload: { data: [...data], total: Number() },
          });
        } catch (e) {
          dispatch({ type: FETCH_ACTION_TYPES.setError, payload: { error: e } });
        }
      }
    };
    fetch();
  }, [page, size, sorting, offset, runId]);

  return state;
};

export default useFilesTableFetch;
