import axios from './axiosInstances/privateAxiosInstance';

const API_URL = '/qs/searches/stat/count-low-quality';

export type LowQualityResponse = {
  lowQuality: string;
};

export const getLowQuality = (bAdminMode:boolean): Promise<LowQualityResponse> => {
  return axios.get(API_URL, {
    params: {
      enableAdmin: bAdminMode,
    },
  });
};


