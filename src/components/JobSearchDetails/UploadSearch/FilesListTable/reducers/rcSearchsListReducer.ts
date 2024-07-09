import produce from 'immer';
import {UploadColumns} from 'src/api/searchDetails';
import { Action, FetchState } from 'src/reducers/fetchReducer';
import { Sorting } from 'src/types/Sorting';

export enum RCS_LIST_ACTION_TYPES {
  updateOptions = 'UPDATE_OPTIONS',
  setRCSearchs = 'SET_AUDITHISTORY',
}

export type RCSearchsListState = FetchState<Array<UploadColumns>> & {
  //total: number;
  page: number;
  offset: number;
  size: number;
  sorting: Sorting<UploadColumns> | null;
  rcSearchList: string;
  delimeter:string;
};

export type UpdateOptionsAction = {
  type: RCS_LIST_ACTION_TYPES.updateOptions;
  payload: Pick<RCSearchsListState, 'sorting' | 'size' | 'page'>;
};

export type SetRCSearchsAction = {
  type: RCS_LIST_ACTION_TYPES.setRCSearchs;
  payload: Pick<RCSearchsListState, 'data'| 'delimeter' >;
};

export type RCSearchsListAction = Action<Array<UploadColumns>> | UpdateOptionsAction | SetRCSearchsAction;

const calcOffset = (page: number, size: number): number => {
  if (page > 1) {
    return (page - 1) * size + 1;
  } else {
    return page;
  }
};

export const rcSearchsListReducer = (
  state: RCSearchsListState,
  action: RCSearchsListAction
): RCSearchsListState =>
  produce(state, (draft: RCSearchsListState) => {
    switch (action.type) {
      case RCS_LIST_ACTION_TYPES.setRCSearchs: {
        const { data, delimeter } = action.payload;
        draft.loading = false;
        draft.error = false;
       
        if (data) {
          draft.data = data;
        }
        if (delimeter) {
          draft.delimeter = delimeter;
        }
        return draft;
      }
      case RCS_LIST_ACTION_TYPES.updateOptions: {
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
