import produce from 'immer';
import PreviewTypeVIew from 'src/types/PreviewTypeVIew';
import { Action, FetchState } from 'src/reducers/fetchReducer';
import { Sorting } from 'src/types/Sorting';

export enum PREVIEW_ACTION_TYPES {  
  updateOptions = 'UPDATE_OPTIONS',
  setPreview='SET_SEARCHDTL',
}

export type PreviewState = FetchState<Array<PreviewTypeVIew>> & {
  total: number;
  page: number;
  offset: number;
  size: number;
  sorting: Sorting<PreviewTypeVIew> | null;
  columnsg:string;
};


export type UpdateOptionsAction = {
  type: PREVIEW_ACTION_TYPES.updateOptions;
  payload: Pick<PreviewState, 'sorting' | 'size' | 'page'>;
};

export type SetPreviewState = {
  type: PREVIEW_ACTION_TYPES.setPreview;
  payload: Pick<PreviewState, 'data' | 'total' | 'columnsg' >;
};
const calcOffset = (page: number, size: number): number => {
  if (page > 1) {
    return (page - 1) * size;
  } else {
    return page-1;
  }
};

export type PreviewAction =
  | Action<Array<PreviewTypeVIew>>
  | UpdateOptionsAction
  | SetPreviewState
  

export const previewReducer = (state: PreviewState, action: PreviewAction): PreviewState =>

  produce(state, (draft: PreviewState) => {
    switch (action.type) {
      case PREVIEW_ACTION_TYPES.setPreview: {
        const { data, total, columnsg } = action.payload;
        draft.loading = false;
        draft.error = false;
        draft.total = total;
        if (data) {
          draft.data = data;
        }
        if (columnsg) {
          draft.columnsg = columnsg;
        }
        return draft;
      }
      case PREVIEW_ACTION_TYPES.updateOptions: {
        const { sorting, size, page } = action.payload;
        if (JSON.stringify(sorting) !== JSON.stringify(draft.sorting)) {
          draft.sorting = sorting;
          draft.offset = 0;
        }
        if (size) {
          draft.size = size;
        }
        if (page !== draft.page && draft.data && draft.columnsg) {
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
