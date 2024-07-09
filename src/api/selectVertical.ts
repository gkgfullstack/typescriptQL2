import axios from './axiosInstances/privateAxiosInstance';
import SelectVerticalType from 'src/types/SelectVerticalType';

const API_URL = '/qs/account/user/vertical';

export type AppIdResponse = {
  vertical: SelectVerticalType[];
};

export const getAppId = (appId?: string): Promise<AppIdResponse> => {
  return axios.get(API_URL, {
    params: {
      ...(appId && { appId }),
    },

  });
};
