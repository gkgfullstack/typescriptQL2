import axios from './axiosInstances/privateAxiosInstance';
import { Sorting } from 'src/types/Sorting';
import RCSearchsType from 'src/types/RCSearchsType';
import SORT_ORDER from 'src/enums/sortOrder';

const API_URL = '/qs/searches/recent-completed';

type RCSearchsRequest = {
  offset: number;
  size: number;
  sortingorder: SORT_ORDER;
  sortingcolumn?: Sorting<RCSearchsType>['field'];
};

export type RCSearchsResponse = {
  rcSearchList: RCSearchsType[];
  totalRecords: number;
  sortingorder: string;
  sortingcolumn: string;
  size: number;
  offset: number;
};

export const getRCSearchs = (
  offset: number,
  size: number,
  sorting: Sorting<RCSearchsType> | null
  //rcSearchList: any
): Promise<RCSearchsResponse> => {
  let  bAdminMode:boolean=false;
  let input = localStorage.getItem("bAdminMode");
  bAdminMode = (input === 'true');
  let params = {
    offset,
    size,
  } as RCSearchsRequest;
  if (sorting) {
    params = {
      ...params,
      sortingorder: SORT_ORDER[sorting.order],
      sortingcolumn: sorting.field,
      enableAdmin:bAdminMode
    } as RCSearchsRequest;
  }

  //const data = {};
  return axios.get(API_URL, {
    params: params,

  });
};


