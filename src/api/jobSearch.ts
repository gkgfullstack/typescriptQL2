import axios from './axiosInstances/privateAxiosInstance';
import { Sorting } from 'src/types/Sorting';
import JobSearchInfo from 'src/types/JobSearchInfo';
import SORT_ORDER from 'src/enums/sortOrder';


const API_URL = '/qs/searches/joblist';

type JobSearchRequest = {
  offset: number;
  size: number;
  sortOrder?: SORT_ORDER;
  sortColumn?: Sorting<JobSearchInfo>['field'];
  jobType: string,
  appId: string,
  createdStart: string,
  createdEnd: string,
  lastrunStart: string,
  lastrunEnd: string,
  finishedStart: string,
  finishedEnd: string,
  updatedStart: string,
  updatedEnd: string,
  jobName: string,
};

export type SearchFilterConditionss = {
  jobList: JobSearchInfo[];
  totalRecords: number;
  sortingorder: string;
  sortingcolumn: string;
  size: number;
  offset: number;
};

export const getJobSearchListSearch = (
  offset: number,
  size: number,
  sorting: Sorting<JobSearchInfo> | null,
  appId: string,
  search: any,
  createdStart: any,
  createdEnd: any,
  lastrunStart: any,
  lastrunEnd: any,
  finishedStart: any,
  finishedEnd: any,
  updatedStart: any,
  updatedEnd: any,
  isPageType: any,
  isPageLoad: any,
  ownerName:any,
  bAdminMode:boolean
): Promise<SearchFilterConditionss> => {
  let params = {
    offset,
    size,
  } as JobSearchRequest;
  if (sorting) {
    params = {
      ...params,
      sortingorder: SORT_ORDER[sorting.order],
      sortingcolumn: sorting.field,
    } as JobSearchRequest;
  }
  if (isPageType === undefined) {
    isPageType = 'All';
    console.log(isPageLoad);
  }
  const data = {
    ...({
      SearchFilterCondition: {
        jobType: isPageType,
        appId: appId,
        createdStart: createdStart,
        createdEnd: createdEnd,
        lastrunStart: lastrunStart,
        lastrunEnd: lastrunEnd,
        finishedStart: finishedStart,
        finishedEnd: finishedEnd,
        updatedStart: updatedStart,
        updatedEnd: updatedEnd,
        ownerName:ownerName,
        allOrgAccounts:bAdminMode,
        jobName: search,
        sortColumn: "null",
        sortOrder: "desc",
        offset: "0",
        size: "10"
      }
    }),
  };
  return axios.post(API_URL, data, {
    params: params,
  });
};