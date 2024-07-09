import axios from './axiosInstances/privateAxiosInstance';

const API_URL = '/qs/searches/stat/scheduled';

export type ScheduledResponse = {
  scheduled: string;
};

export const getScheduled = (): Promise<ScheduledResponse> => {
  return axios.get(API_URL);
};


