import axios from './axiosInstances/privateAxiosInstance';
import SearchDtlListInfo from 'src/types/SearchDtlListInfo';
import { Sorting } from 'src/types/Sorting';
import SORT_ORDER from 'src/enums/sortOrder';
import Schedule from 'src/types/Schedule';


const API_URL = '/qs/searches/schedule';
const REMOVE_SCHEDULE_API_URL = '/qs/searches/schedule/delete';


type ScheduleRequest = {
  jobId: string;
  offset: number;
  size: number;
  sortingOrder?: SORT_ORDER;
  sortingColumn?: Sorting<SearchDtlListInfo>['field'];
};

export type ScheduleResponse = {
  scheduleList: [];
  totalRecords: number;
};
export type ScheduleResponse1 = {
  scheduleList: Schedule[];
};


export const getScheduleList = (
  jobId: string,
  sorting: Sorting<SearchDtlListInfo> | null
): Promise<ScheduleResponse> => {
  let params = {
    jobId: jobId,

  } as ScheduleRequest;
  if (sorting) {
    params = {
      ...params,
      sortingOrder: SORT_ORDER[sorting.order],
      sortingColumn: sorting.field,
    } as ScheduleRequest;
  }
  return axios.get(API_URL, {
    params: params,
  });
};
export const removeSchedule = (
  jobId: string,
  scheduleId: string,

): Promise<ScheduleResponse1> => {
  return axios.get(REMOVE_SCHEDULE_API_URL, {
    params: {
      jobId: jobId,
      scheduleId: scheduleId,
    },
  });
};


