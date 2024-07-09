import axios from './axiosInstances/privateAxiosInstance';
import { Sorting } from 'src/types/Sorting';
import TableResultlistType from 'src/types/TableResultlistType';
import SORT_ORDER from 'src/enums/sortOrder';

const API_URL = '/qs/result/resultjoblist';

type ResultlistRequest = {
  offset: number;
  size: number;
  sortingorder: SORT_ORDER;
  sortingcolumn?: Sorting<TableResultlistType>['field'];
  sortOrder?: SORT_ORDER;
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
  jobId: string
};

export type ResultlistResponse = {
  resultList: TableResultlistType[];
  totalRecords: number;
  sortingorder: string;
  sortingcolumn: string;
  size: number;
  offset: number;
};

export const getResultlist = (
  offset: number,
  size: number,
  sorting: Sorting<TableResultlistType> | null,
  appId: string,
  jobId: string,
  search: any,
  createdStart: any,
  createdEnd: any,
  lastrunStart: any,
  lastrunEnd: any,
  finishedStart: any,
  finishedEnd: any,
  updatedStart: any,
  updatedEnd: any,
  
): Promise<ResultlistResponse> => {
  let params = {
    offset,
    size,
  } as ResultlistRequest;
  if (sorting) {
    params = {
      ...params,
      sortingorder: SORT_ORDER[sorting.order],
      sortingcolumn: sorting.field,
    } as ResultlistRequest;
  }
  
  const data = {
    ...({
      SearchFilterResultJob: {
       appId: appId,
        jobId: jobId,
        createdStart: createdStart,
        createdEnd: createdEnd,
        lastrunStart: lastrunStart,
        lastrunEnd: lastrunEnd,
        finishedStart: finishedStart,
        finishedEnd: finishedEnd,
        updatedStart: updatedStart,
        updatedEnd: updatedEnd,
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

