import produce from 'immer';
import TableResultlistType from 'src/types/TableResultlistType';
import { Action, FetchState } from 'src/reducers/fetchReducer';
import { Sorting } from 'src/types/Sorting';


export enum RT_LIST_ACTION_TYPES {
  updateOptions = 'UPDATE_OPTIONS',
  setResultsTable = 'SET_AUDITHISTORY',
}

export type ResultsTableListState = FetchState<Array<TableResultlistType>> & {
  total: number;
  page: number;
  offset: number;
  size: number;
  appId: any;
  jobId: any;
  jobName: string;
  sorting: Sorting<TableResultlistType> | null;
  searchFilterConditionGet: string;
 
  createdStart:string;
  createdEnd:string;
  lastrunStart:string;
  lastrunEnd:string;
  finishedStart:string;
  finishedEnd:string;
  updatedStart:string;
  updatedEnd:string;
  errorMsg:string;
};

export type UpdateOptionsAction = {
  type: RT_LIST_ACTION_TYPES.updateOptions;
  payload: Pick<ResultsTableListState,
    'sorting'
    | 'size'
    | 'page'
    | 'appId'
    | 'jobId'
    | 'jobName'
    | 'createdStart'
    | 'createdEnd'
    | 'lastrunStart'
    | 'lastrunEnd'
    | 'finishedStart'
    | 'finishedEnd'
    | 'updatedStart'
    | 'updatedEnd'
  
  >;
};

export type SetResultsTableAction = {
  type: RT_LIST_ACTION_TYPES.setResultsTable;
  payload: Pick<ResultsTableListState, 'data' | 'total' | 'errorMsg'>;
};

export type ResultsTableListAction = Action<Array<TableResultlistType>> | UpdateOptionsAction | SetResultsTableAction;

const calcOffset = (page: number, size: number): number => {
  if (page > 1) {
    return (page - 1) * size + 1;
  } else {
    return page;
  }
};

export const resultsTableListReducer = (
  state: ResultsTableListState,
  action: ResultsTableListAction
): ResultsTableListState =>
  produce(state, (draft: ResultsTableListState) => {
    switch (action.type) {
      case RT_LIST_ACTION_TYPES.setResultsTable: {
        const { data, total,errorMsg } = action.payload;
        draft.loading = false;
        draft.error = false;
        draft.total = total;
        draft.errorMsg=errorMsg
        if (data) {
          draft.data = data;
        }
        return draft;
      }
      case RT_LIST_ACTION_TYPES.updateOptions: {
        const {
          sorting,
          size,
          page,
          appId,
          jobId,
          jobName,
          createdStart,
          createdEnd,
          lastrunStart,
          lastrunEnd,
          finishedStart,
          finishedEnd,
          updatedStart,
          updatedEnd
          } = action.payload;
        if (JSON.stringify(sorting) !== JSON.stringify(draft.sorting)) {
          draft.sorting = sorting;
          draft.offset = 1;
        }
        if (size) {
          draft.size = size;
        }
        if (appId) {
          draft.appId = appId;
        }
        if (jobId) {
          draft.jobId = jobId;
        }
        if (jobName !== draft.jobName) {
          draft.jobName = jobName;
        }
        if (createdStart !== draft.createdStart) {
          draft.createdStart = createdStart;
        }
        if (createdEnd !== draft.createdEnd) {
          draft.createdEnd = createdEnd;
        }
        if (lastrunStart !== draft.lastrunStart) {
          draft.lastrunStart = lastrunStart;
        }
        if (lastrunEnd !== draft.lastrunEnd) {
          draft.lastrunEnd = lastrunEnd;
        }
        if (finishedStart !== draft.finishedStart) {
          draft.finishedStart = finishedStart;
        }
        if (finishedEnd !== draft.finishedEnd) {
          draft.finishedEnd = finishedEnd;
        }
        if (updatedStart !== draft.updatedStart) {
          draft.updatedStart = updatedStart;
        }
        if (updatedEnd !== draft.updatedEnd) {
          draft.updatedEnd = updatedEnd;
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
