import produce from 'immer';
import RTLPreviewType from 'src/types/RTLPreviewType';
import { Action, FetchState } from 'src/reducers/fetchReducer';
import { Sorting } from 'src/types/Sorting';

export enum PREVIEW_ACTION_TYPES {  
  updateOptions = 'UPDATE_OPTIONS',
  setPreview='SET_SEARCHDTL',
}

export type PreviewState = FetchState<Array<RTLPreviewType>> & {
  total: number;
  page: number;
  offset: number;
  size: number;
  sorting: Sorting<RTLPreviewType> | null;
  columnsg:string;
  resultid:any;
  message:string;
  listdata:string;
};


export type UpdateOptionsAction = {
  type: PREVIEW_ACTION_TYPES.updateOptions;
  payload: Pick<PreviewState, 'sorting' | 'size' | 'page' | 'resultid'>;
};

export type SetPreviewState = {
  type: PREVIEW_ACTION_TYPES.setPreview;
  payload: Pick<PreviewState, 'data' | 'total' | 'columnsg' | 'message' | 'listdata' >;
};
const calcOffset = (page: number, size: number): number => {
  if (page > 1) {
    return (page - 1) * size + 1;
  } else {
    return page;
  }
};

export type PreviewAction =
  | Action<Array<RTLPreviewType>>
  | UpdateOptionsAction
  | SetPreviewState
  

export const previewReducer = (state: PreviewState, action: PreviewAction): PreviewState =>

  produce(state, (draft: PreviewState) => {
    switch (action.type) {
      case PREVIEW_ACTION_TYPES.setPreview: {
        const { data, total, columnsg, message, listdata } = action.payload;
        draft.loading = false;
        draft.error = false;
        draft.total = total;
        if (data) {
          draft.data = data;
        }
        if (columnsg) {
          draft.columnsg = columnsg;
        }
        if (message) {
          draft.message = message;
        }
        if (listdata) {
          draft.listdata = listdata;
        }
        return draft;
      }
      case PREVIEW_ACTION_TYPES.updateOptions: {
        const { sorting, size, page, resultid } = action.payload;
        if (JSON.stringify(sorting) !== JSON.stringify(draft.sorting)) {
          draft.sorting = sorting;
          draft.offset = 1;
        }
        if (size) {
          draft.size = size;
        }
        if (resultid) {
          draft.resultid = resultid;
        }
        if (page !== draft.page && draft.data && draft.columnsg && draft.message && draft.listdata) {
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
