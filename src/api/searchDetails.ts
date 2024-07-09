import axios from './axiosInstances/privateAxiosInstance';
import SearchDtlListInfo from 'src/types/SearchDtlListInfo';
import { Sorting } from 'src/types/Sorting';
import SORT_ORDER from 'src/enums/sortOrder';
import PreviewTypeVIew from 'src/types/PreviewTypeVIew';

import { UploadRequest } from 'src/components/JobSearchDetails/UploadSearch/hooks/useSearchUploadingState';

const API_URL = '/qs/searches/lineitem/viewdatamodel';
const REMOVE_SEARCH_DTL_API_URL = '/qs/searches/lineitemdel';
const UPLOAD_API_URL = "/qs/searches/lineitem/upload"
const COLUMNS_API_URL = "/qs/searches/lineitem/uploadmodel"
const VIEW_API_URL = '/qs/searches/lineitemsummary';

type SearchDetailRequest = {
  jobId: string;
  offset: number;
  size: number;
  sortingOrder?: SORT_ORDER;
  sortingColumn?: Sorting<SearchDtlListInfo>['field'];
};

type PreviewApiVIewRequest = {
  jobId: string;
  offset: number;
  size: number;
  sortingOrder?: SORT_ORDER;
  sortingColumn?: Sorting<PreviewTypeVIew>['field'];
};

export type SearchDetailResponse = {
  searchDetailList: [];
  totalRecords: number;
};
export type PreviewApiVIewResponse = {
  lineitems: PreviewTypeVIew[];
  TotalRecord: number;
  size: number;
  offset: number;
  columns: string;
};
export type ScheduleResponse1 = {
  searchDetailList: SearchDtlListInfo[];
};
export type UploadResponse = {
  searchDetailList: SearchDtlListInfo[];
  message: string;
};

export const getPreviewApiVIew = (
  jobId: string,
  offset: number,
  size: number,
  sorting: Sorting<PreviewTypeVIew> | null,
): Promise<PreviewApiVIewResponse> => {
  let params = {
    jobId: jobId,
    offset: offset,
    size: size,
  } as PreviewApiVIewRequest;
  if (sorting) {
    params = {
      ...params,
      sortingOrder: SORT_ORDER[sorting.order],
      sortingColumn: sorting.field,
    } as PreviewApiVIewRequest;
  }
  return axios.get(API_URL, {
    params: params,
  });
};

export const getSearchDetailList = (
  jobId: string,
  sorting: Sorting<SearchDtlListInfo> | null
): Promise<SearchDetailResponse> => {
  let params = {
    jobId: jobId,

  } as SearchDetailRequest;
  if (sorting) {
    params = {
      ...params,
      sortingOrder: SORT_ORDER[sorting.order],
      sortingColumn: sorting.field,
    } as SearchDetailRequest;
  }
  return axios.get(VIEW_API_URL, {
    params: params,
  });
};

export const removeSearchDetail = (
  jobId: string,
  type: string,

): Promise<ScheduleResponse1> => {
  return axios.get(REMOVE_SEARCH_DTL_API_URL, {
    params: {
      jobId: jobId,
      type: type,
    },
  });
};


export const uploadSearchData = (
  values: UploadRequest
): Promise<UploadResponse> => {
  var bodyFormData = new FormData();
  bodyFormData.set('file', values.file);
  bodyFormData.set('uploadId', values.uploadId);
  bodyFormData.set('delim', values.fileFormat);


  return axios.post(UPLOAD_API_URL, bodyFormData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }

  });
};

export type UploadColumns = {
  id: string;
  helpId: string;
  description: string;
  name: string;

};

export default UploadColumns;

export type ColumnsResponse = {
  columns: UploadColumns[];
  numberOfColumns: number;
  delimeter:string;
};

export const getUploadColumnsList = (
  jobId: string,

): Promise<ColumnsResponse> => {
  let params = {
    jobId: jobId,
  } as SearchDetailRequest;
  return axios.get(COLUMNS_API_URL, {
    params: params,
  });
};






