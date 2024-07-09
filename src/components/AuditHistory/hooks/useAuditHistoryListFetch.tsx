import { useEffect, useReducer } from 'react';
import { getAuditHistoryListSearch, AuditHistoryResponse } from 'src/api/auditHistory';
import { FETCH_ACTION_TYPES, fetchReducer } from 'src/reducers/fetchReducer';
import AuditHistoryInfo from 'src/types/AuditHistoryInfo';
import { Sorting } from 'src/types/Sorting';
import {
  AUDITHISTORY_LIST_ACTION_TYPES,
  AuditHistoryListAction,
  auditHistoryListReducer,
  AuditHistoryListState,
} from '../reducers/auditHistoryListReducer';

const initialState: AuditHistoryListState = {
  loading: false,
  error: false,
  data: null,
  total: 0,
  page: 1,
  offset: 1,
  size: 0,
  sorting: null,
  auditHistoryList: '',
};

const useAuditHistoryListFetch = (
  initialSorting: Sorting<AuditHistoryInfo>,
  initialPage: number,
  initialSize: number,
  filters: any
): AuditHistoryListState => {
  const [state, dispatch] = useReducer(
    (state: AuditHistoryListState, action: AuditHistoryListAction) => {
      const fetchState: AuditHistoryListState = fetchReducer(state, action) as AuditHistoryListState;
      return auditHistoryListReducer({ ...fetchState }, action);
    },
    { ...initialState, sorting: initialSorting, size: initialSize }
  );
  const { offset, page, size, sorting } = state;
  const field = sorting ? sorting.field : null;
  const order = sorting ? sorting.order : null;
  const { status, requestType, reporter, competitorSite } = filters;

  useEffect(() => {
    if (initialSorting && initialSize && initialPage) {
      dispatch({
        type: AUDITHISTORY_LIST_ACTION_TYPES.updateOptions,
        payload: { sorting: initialSorting, size: initialSize, page: initialPage },
      });
    }
  }, [initialSorting, initialSize, initialPage]);

  useEffect(() => {
    const fetch = async () => {
      if (dispatch) {
        dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
        try {
          const { auditHistoryList: data, totalRecords }: AuditHistoryResponse = await getAuditHistoryListSearch(
            offset,
            size,
            sorting,
            filters
          );
          dispatch({
            type: AUDITHISTORY_LIST_ACTION_TYPES.setAuditHistory,
            payload: { data: [...data], total: Number(totalRecords) },
          });
        } catch (e) {
          dispatch({ type: FETCH_ACTION_TYPES.setError, payload: { error: e } });
        }
      }
    };

    if (field && order && status && requestType && reporter && competitorSite) {
      fetch();
    } else {
      dispatch({
        type: AUDITHISTORY_LIST_ACTION_TYPES.setAuditHistory,
        payload: { data: [], total: 0 },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, size, field, order, offset, status, requestType, reporter, competitorSite]);

  return state;
};

export default useAuditHistoryListFetch;
