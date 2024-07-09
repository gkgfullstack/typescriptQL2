import axios from './axiosInstances/privateAxiosInstance';

const API_URL = '/qs/searches/stat/count-active';

export type DashboardResponse = {
  Active_Queued: string;
  Active_Running: string;
};

export const getDashboard = (bAdminMode:boolean): Promise<DashboardResponse> => {
  return axios.get(API_URL, {
    params: {
      enableAdmin: bAdminMode,
    },
  });
};


