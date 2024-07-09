import axios from './axiosInstances/privateAxiosInstance';
import { Sorting } from 'src/types/Sorting';
import TableResultlistType from 'src/types/TableResultlistType';
import SORT_ORDER from 'src/enums/sortOrder';
import UserContex from 'src/services/UserContex';

const API_URL = '/qs/result/resultfilter';

type ResultlistRequest = {
  offset: number;
  size: number;
  sortingorder: SORT_ORDER;
  sortingcolumn?: Sorting<TableResultlistType>['field'];
  sortOrder?: SORT_ORDER;
  jobType: string,
  appId: string,
};

export type ResultlistResponse = {
  resultList: TableResultlistType[];
  totalRecords: number;
  sortingorder: string;
  sortingcolumn: string;
  size: number;
  offset: number;
  errorMsg: string
};
let  bAdminMode:boolean=false;
let input = localStorage.getItem("bAdminMode");
bAdminMode = (input === 'true');
export const getResultlist = (
  offset: number,
  size: number,
  sorting: Sorting<TableResultlistType> | null,
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
): Promise<ResultlistResponse> => {
  let params = {
    offset,
    size,    
  } as ResultlistRequest;
  if (sorting) {
    params = {
      ...params,
      sortingorder: SORT_ORDER[sorting.order] !== undefined ? SORT_ORDER[sorting.order] : "desc",
      sortingcolumn: sorting.field !== undefined ? sorting.field : "Finished" ,
    } as ResultlistRequest;
  }
  if (isPageType === undefined) {
    isPageType = 'All';
  }
  const currentTime:any = UserContex.getDateFormat() !== undefined ? UserContex.getDateFormat() : "mm/dd/yy";
  const data = {
    ...({
      SearchFilterResult: {
        jobType: isPageType,
        appId: appId !== null ? appId : "-1",
        createdStart: createdStart !== undefined ? createdStart : currentTime,
        createdEnd: createdEnd,
        lastrunStart: lastrunStart,
        lastrunEnd: lastrunEnd,
        finishedStart: finishedStart,
        finishedEnd: finishedEnd,
        updatedStart: updatedStart,
        updatedEnd: updatedEnd,
        jobName: search,
        allOrgAccounts:bAdminMode,
      }
    }),
  };
  return axios.post(API_URL, data, {
    params: params,
  });
};

