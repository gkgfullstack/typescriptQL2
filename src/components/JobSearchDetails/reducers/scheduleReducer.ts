import produce from 'immer';
import Schedule from 'src/types/Schedule';
import { Action, FetchState } from 'src/reducers/fetchReducer';
import { Sorting } from '../../../types/Sorting';

export enum SEARCHDTL_ACTION_TYPES {
  
  updateOptions = 'UPDATE_OPTIONS',
  removeSchedules = 'REMOVE_SCHEDULES',
  addMatches = 'ADD_MATCHES',
  setSearchDtl='SET_SEARCHDTL',
}

export type SearchDtlState = FetchState<Array<Schedule>> & {
  total: number;
  
  sorting: Sorting<Schedule> | null;
};


export type UpdateOptionsAction = {
  type: SEARCHDTL_ACTION_TYPES.updateOptions;
  payload: Pick<SearchDtlState, 'sorting' >;
};

export type SetSearchDtlAction = {
  type: SEARCHDTL_ACTION_TYPES.setSearchDtl;
  payload: Pick<SearchDtlState, 'data' | 'total'>;
};
export type RemoveScheduleAction = {
  type: SEARCHDTL_ACTION_TYPES.removeSchedules;
  payload: { removeSchedules: Schedule[] };
};


export type SearcheDtlAction =
  | Action<Array<Schedule>>
  | UpdateOptionsAction
  | SetSearchDtlAction
  | RemoveScheduleAction
  

export const scheduleReducer = (state: SearchDtlState, action: SearcheDtlAction): SearchDtlState =>
  produce(state, (draft: SearchDtlState) => {
    switch (action.type) {
      case SEARCHDTL_ACTION_TYPES.setSearchDtl: {
        const { data, total } = action.payload;
        draft.loading = false;
        draft.error = false;
        draft.total = total;
        if (data) {
          draft.data = data;
        }
        return draft;
      }
      case SEARCHDTL_ACTION_TYPES.updateOptions: {
        const { sorting } = action.payload;
        if (JSON.stringify(sorting) !== JSON.stringify(draft.sorting)) {
          draft.sorting = sorting;
        }
        return draft;
      }
      
      default: {
        return draft;
      }
    }
  });
