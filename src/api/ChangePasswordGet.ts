//import  ChangePasswordGetType  from 'src/types/ChangePasswordGetType';
import axios from './axiosInstances/privateAxiosInstance';

//const API_URL = 'https://live-alpha.ql2.com/rest/account/user/gethelp?helptopic=passwordChange';
const API_URL = '/qs/common/help/gethelp?helptopic=passwordChange';

export type ChangePasswordAPIResponse = {  
  sContent:any;
  sWebsiteName:any
};
 
export const getChangePasswordAPI = (): Promise<ChangePasswordAPIResponse> => {
  return axios.get(API_URL);
};


