import axios from './axiosInstances/privateAxiosInstance';
import { Sorting } from 'src/types/Sorting';
import JobSearchInfoAllType from 'src/types/JobSearchInfoAllType';

const API_URL = '/qs/account/user/vertical';

type JobSearchRequestAll = {
  ID: number;
  name: string,
};

export type SearchFilterConditionssAll = {
  ID: number;
  name: string,
};

export const getJobSearchListAllSearch = (
  sorting: Sorting<JobSearchInfoAllType> | null,
): Promise<SearchFilterConditionssAll> => {
  let params = {
  } as JobSearchRequestAll;
  if (sorting) {
    params = {
      ...params,
    } as JobSearchRequestAll;
  }

  return axios.get(API_URL, {
    params: params,
  });
};
