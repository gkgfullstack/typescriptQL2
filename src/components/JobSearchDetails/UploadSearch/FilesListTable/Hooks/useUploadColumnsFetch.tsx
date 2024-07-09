import { useEffect, useReducer } from 'react';
import { getUploadColumnsList, ColumnsResponse } from 'src/api/searchDetails';
import { FETCH_ACTION_TYPES, fetchReducer } from 'src/reducers/fetchReducer';
import RCSearchsType from 'src/types/RCSearchsType';
import { Sorting } from 'src/types/Sorting';
import {
  RCS_LIST_ACTION_TYPES,
  RCSearchsListAction,
  rcSearchsListReducer,
  RCSearchsListState,
} from '../reducers/rcSearchsListReducer';
import { useSearchDetailsStateContext } from 'src/stateProviders/useSearchDetailsStateContext';

const initialState: RCSearchsListState = {
  loading: false,
  error: false,
  data: null, 
  page: 1,
  offset: 1,
  size: 0,
  sorting: null,
  rcSearchList: '',
  delimeter:"c",
};

const useUploadColumnsFetch = (
  initialSorting: Sorting<RCSearchsType>,
  initialSize: number
): RCSearchsListState => {
  const [state, dispatch] = useReducer(
    (state: RCSearchsListState, action: RCSearchsListAction) => {
      const fetchState: RCSearchsListState = fetchReducer(state, action) as RCSearchsListState;
      return rcSearchsListReducer({ ...fetchState }, action);
    },
    { ...initialState, sorting: initialSorting, size: initialSize }
  );
  const { offset, page, size, sorting } = state;
  const {searchId} = useSearchDetailsStateContext();
 
  useEffect(() => {
    const fetch = async () => {
      if (searchId) {
        dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
        try {
          const { columns: data, delimeter:delimeter }: ColumnsResponse = await getUploadColumnsList(searchId);
          dispatch({
            type: RCS_LIST_ACTION_TYPES.setRCSearchs,
            payload: { data: [...data], delimeter },
          });
        } catch (e) {
          dispatch({ type: FETCH_ACTION_TYPES.setError, payload: { error: e } });
        }
      }
    };
    fetch();
  }, [page, size, sorting, offset, searchId]);

  return state;
};

export default useUploadColumnsFetch;
