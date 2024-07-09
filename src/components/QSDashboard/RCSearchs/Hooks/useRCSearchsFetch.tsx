import { useEffect, useReducer } from 'react';
import { getRCSearchs, RCSearchsResponse } from 'src/api/RCSearchs';
import { FETCH_ACTION_TYPES, fetchReducer } from 'src/reducers/fetchReducer';
import RCSearchsType from 'src/types/RCSearchsType';
import { Sorting } from 'src/types/Sorting';
import {
  RCS_LIST_ACTION_TYPES,
  RCSearchsListAction,
  rcSearchsListReducer,
  RCSearchsListState,
} from '../reducers/rcSearchsListReducer';

const initialState: RCSearchsListState = {
  loading: false,
  error: false,
  data: null,
  total: 0,
  page: 1,
  offset: 0,
  size: 0,
  sorting: null,
  rcSearchList: '',
};

const useRCSearchsFetch = (
  initialSorting: Sorting<RCSearchsType>,
  initialPage: number,
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

  useEffect(() => {
    if (initialSorting && initialSize && initialPage) {
      dispatch({
        type: RCS_LIST_ACTION_TYPES.updateOptions,
        payload: { sorting: initialSorting, size: initialSize, page: initialPage },
      });
    }
  }, [initialSorting, initialSize, initialPage]);

  useEffect(() => {
    const fetch = async () => {
      if (dispatch) {
        dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
        try {
          const { rcSearchList: data, totalRecords }: RCSearchsResponse = await getRCSearchs(
            offset,
            size,
            sorting
          );
          dispatch({
            type: RCS_LIST_ACTION_TYPES.setRCSearchs,
            payload: { data: [...data], total: Number(totalRecords) },
          });
        } catch (e) {
          dispatch({ type: FETCH_ACTION_TYPES.setError, payload: { error: e } });
        }
      }
    };
    fetch();
  }, [page, size, sorting, offset]);

  return state;
};

export default useRCSearchsFetch;
