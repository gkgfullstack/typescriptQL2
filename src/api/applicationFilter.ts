import axios from './axiosInstances/privateAxiosInstance';
import ApplicationFilterType from 'src/types/ApplicationFilterType';

const API_URL = '/qs/account/user/vertical';

export type AppIdResponse = {
  vertical: ApplicationFilterType[];
};

export const getAppId = (enableAdmin?: boolean): Promise<AppIdResponse> => {
  return axios.get(API_URL, {
    params: {
      ...(enableAdmin && { enableAdmin }),
    },
  });
};
