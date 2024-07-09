import SettingType from 'src/types/SettingType';
import axios from './axiosInstances/privateAxiosInstance';

//const API_URL = 'https://live-alpha.ql2.com/rest/account/settings/getsettingsdata';
const API_URL = '/qs/account/settings/settingsdata';
//const API_URL = 'https://skgevsp4zc-vpce-07b43b2da4181689f.execute-api.us-west-2.amazonaws.com/cc/qs/mock/customfilter';
//const API_URLGENERAL = 'https://live-alpha.ql2.com/rest/account/settings/gettimezone';
export const API_URL_TIMEZONE_SETTINGS = '/qs/account/settings/timezone';
//const API_URLEMAILLIST = 'https://live-alpha.ql2.com/rest/account/settings/getemailparameter';

export type SettingsAPIResponse = {
  settings: SettingType;
};

export const getSettingsAPI = (): Promise<SettingsAPIResponse> => {
  return axios.get(API_URL);
};
export const getSettingsGeneralAPI = (): Promise<SettingsAPIResponse> => {
  return axios.get(API_URL_TIMEZONE_SETTINGS);
};
// export const getSettingsEmailAPI = (): Promise<SettingsAPIResponse> => {
//   return axios.get(API_URLEMAILLIST);
// };
