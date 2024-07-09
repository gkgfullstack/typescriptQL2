import axios from './axiosInstances/privateAxiosInstance';

const API_URL = '/qs/searches/reports';

export type ReportsResponse = {
  outputs: string;
  inputs: string;
};

export const getReports = (): Promise<ReportsResponse> => {
  return axios.get(API_URL);
};


