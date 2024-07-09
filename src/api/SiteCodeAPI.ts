import axios from './axiosInstances/privateAxiosInstance';
import SiteCodeType from 'src/types/SiteCodeType';

const API_URL = '/qs/account/user/enablesite';

export type SiteCodeResponse = {
  siteDataList: SiteCodeType;
};
export const getSiteCode = (appId: string, appType?: string): Promise<SiteCodeResponse> => {
  return axios.get(API_URL, {
    params: {
      appId: appId,
      appType,
    },

  });
};
