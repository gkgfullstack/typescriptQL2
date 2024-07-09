import produce from 'immer';
import AuditHistoryInfo from 'src/types/AuditHistoryInfo';
import { Action, FetchState } from 'src/reducers/fetchReducer';
import { Sorting } from 'src/types/Sorting';

export enum AUDITHISTORY_LIST_ACTION_TYPES {
  updateOptions = 'UPDATE_OPTIONS',
  setAuditHistory = 'SET_AUDITHISTORY',
}

export type AuditHistoryListState = FetchState<Array<AuditHistoryInfo>> & {
  total: number;
  page: number;
  offset: number;
  size: number;
  sorting: Sorting<AuditHistoryInfo> | null;
  auditHistoryList: string;
};

export type UpdateOptionsAction = {
  type: AUDITHISTORY_LIST_ACTION_TYPES.updateOptions;
  payload: Pick<AuditHistoryListState, 'sorting' | 'size' | 'page'>;
};

export type SetAuditHistoryAction = {
  type: AUDITHISTORY_LIST_ACTION_TYPES.setAuditHistory;
  payload: Pick<AuditHistoryListState, 'data' | 'total'>;
};

export type AuditHistoryListAction = Action<Array<AuditHistoryInfo>> | UpdateOptionsAction | SetAuditHistoryAction;

const calcOffset = (page: number, size: number): number => {
  if (page > 1) {
    return (page - 1) * size + 1;
  } else {
    return page;
  }
};

export const auditHistoryListReducer = (
  state: AuditHistoryListState,
  action: AuditHistoryListAction
): AuditHistoryListState =>
  produce(state, (draft: AuditHistoryListState) => {
    switch (action.type) {
      case AUDITHISTORY_LIST_ACTION_TYPES.setAuditHistory: {
        const { data, total } = action.payload;
        draft.loading = false;
        draft.error = false;
        draft.total = total;
        if (data) {
          draft.data = data;
        }
        return draft;
      }
      case AUDITHISTORY_LIST_ACTION_TYPES.updateOptions: {
        const { sorting, size, page } = action.payload;
        if (JSON.stringify(sorting) !== JSON.stringify(draft.sorting)) {
          draft.sorting = sorting;
          draft.offset = 1;
        }
        if (size) {
          draft.size = size;
        }
        if (page !== draft.page && draft.data) {
          const currOffset = calcOffset(page, size);
          draft.offset = currOffset;
          draft.page = page;
        }
        return draft;
      }
      default: {
        return draft;
      }
    }
  });
