import produce from 'immer';
import JobSearchInfo from 'src/types/JobSearchInfo';
import { Action, FetchState } from 'src/reducers/fetchReducer';
import { Sorting } from 'src/types/Sorting';

export enum JOBSEARCH_LIST_ACTION_TYPES {
  updateOptions = 'UPDATE_OPTIONS',
  setJobSearch = 'SET_JOBSEARCH',
}

export type JobSearchListState = FetchState<Array<JobSearchInfo>> & {
  total: number;
  page: number;
  offset: number;
  size: number;
  appId: any;
  jobName: string;
  sorting: Sorting<JobSearchInfo> | null;
  searchFilterConditionGet: string;
  isPageType: string;
  createdStart:string;
  createdEnd:string;
  lastrunStart:string;
  lastrunEnd:string;
  finishedStart:string;
  finishedEnd:string;
  updatedStart:string;
  updatedEnd:string;
  isPageLoad:any;
  ownerName:string;
  bAdminMode:boolean;
};

export type UpdateOptionsAction = {
  type: JOBSEARCH_LIST_ACTION_TYPES.updateOptions;
  payload: Pick<JobSearchListState,
    'sorting'
    | 'size'
    | 'page'
    | 'appId'
    | 'jobName'
    | 'createdStart'
    | 'createdEnd'
    | 'lastrunStart'
    | 'lastrunEnd'
    | 'finishedStart'
    | 'finishedEnd'
    | 'updatedStart'
    | 'updatedEnd'
    | 'isPageType'
    | 'isPageLoad'
    | 'ownerName'
    | 'bAdminMode'
  >;
};

export type SetJobSearchAction = {
  type: JOBSEARCH_LIST_ACTION_TYPES.setJobSearch;
  payload: Pick<JobSearchListState, 'data' | 'total'>;
};

export type JobSearchListAction = Action<Array<JobSearchInfo>> | UpdateOptionsAction | SetJobSearchAction;

const calcOffset = (page: number, size: number): number => {
  if (page > 1) {
    return (page - 1) * size + 1;
  } else {
    return page;
  }
};

export const jobSearchListReducer = (
  state: JobSearchListState,
  action: JobSearchListAction
): JobSearchListState =>
  produce(state, (draft: JobSearchListState) => {
    switch (action.type) {
      case JOBSEARCH_LIST_ACTION_TYPES.setJobSearch: {
        const { data, total } = action.payload;
        draft.loading = false;
        draft.error = false;
        draft.total = total;
        if (data) {
          draft.data = data;
        }
        return draft;
      }
      case JOBSEARCH_LIST_ACTION_TYPES.updateOptions: {
        const {
          sorting,
          size,
          page,
          appId,
          jobName,
          createdStart,
          createdEnd,
          lastrunStart,
          lastrunEnd,
          finishedStart,
          finishedEnd,
          updatedStart,
          updatedEnd,
          isPageType,
          isPageLoad,
          ownerName,
          bAdminMode } = action.payload;
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
        if (isPageType !== draft.isPageType)
          draft.isPageType = isPageType;
          
        if (isPageLoad !== draft.isPageLoad)
          draft.isPageLoad = isPageLoad;
        if (ownerName !== draft.ownerName)
          draft.ownerName = ownerName;
       if (bAdminMode !== draft.bAdminMode)
          draft.bAdminMode = bAdminMode;

          
        return draft;
      }
      default: {
        return draft;
      }
    }
  });
