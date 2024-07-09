import produce from 'immer';
import FileTableResultType from 'src/types/FileTableResultType';
import { Action, FetchState } from 'src/reducers/fetchReducer';
import { Sorting } from 'src/types/Sorting';

export enum FILES_LIST_ACTION_TYPES {
  updateOptions = 'UPDATE_OPTIONS',
  setResultsTable = 'SET_AUDITHISTORY',
}

export type FilesResultsTableListState = FetchState<Array<FileTableResultType>> & {
  total: number;
  page: number;
  offset: number;
  size: number;
  sorting: Sorting<FileTableResultType> | null;
  resultList: string;
};

export type UpdateOptionsAction = {
  type: FILES_LIST_ACTION_TYPES.updateOptions;
  payload: Pick<FilesResultsTableListState, 'sorting' | 'size' | 'page'>;
};

export type SetResultsTableAction = {
  type: FILES_LIST_ACTION_TYPES.setResultsTable;
  payload: Pick<FilesResultsTableListState, 'data' | 'total'>;
};

export type FilesResultsTableListAction = Action<Array<FileTableResultType>> | UpdateOptionsAction | SetResultsTableAction;

const calcOffset = (page: number, size: number): number => {
  if (page > 1) {
    return (page - 1) * size + 1;
  } else {
    return page;
  }
};

export const filesresultsTableListReducer = (
  state: FilesResultsTableListState,
  action: FilesResultsTableListAction
): FilesResultsTableListState =>
  produce(state, (draft: FilesResultsTableListState) => {
    switch (action.type) {
      case FILES_LIST_ACTION_TYPES.setResultsTable: {
        const { data, total } = action.payload;
        draft.loading = false;
        draft.error = false;
        draft.total = total;
        if (data) {
          draft.data = data;
        }
        return draft;
      }
      case FILES_LIST_ACTION_TYPES.updateOptions: {
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
