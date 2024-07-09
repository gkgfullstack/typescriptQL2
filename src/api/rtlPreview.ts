import axios from './axiosInstances/privateAxiosInstance';
import RTLPreviewType from 'src/types/RTLPreviewType';
import { SORT_ORDER } from 'src/enums';
import { Sorting } from 'src/types/Sorting'; 

const API_URL = '/qs/result/view';

type RTLPreviewRequest = {
  resultid: string;
  offset: number;
  size: number;
  sortingOrder?: SORT_ORDER;
  sortingColumn?: Sorting<RTLPreviewType>['field'];
};

export type RTLPreviewResponse = {
  lineItems: RTLPreviewType[];
  TotalRecord: number;
  size: number;
  offset: number;
  columns: string;
  message: string;
  listdata: string
};

export const getRTLPreview = (
  resultid: string,
  offset: number,
  size: number,
  sorting: Sorting<RTLPreviewType> | null,
): Promise<RTLPreviewResponse> => {
  let params = {
    resultid: resultid,
    offset: offset,
    size: size,
  } as RTLPreviewRequest;
  if (sorting) {
    params = {
      ...params,
      sortingOrder: SORT_ORDER[sorting.order],
      sortingColumn: sorting.field,
    } as RTLPreviewRequest;
  }
  return axios.get(API_URL, {
    params: params,
  });
};







