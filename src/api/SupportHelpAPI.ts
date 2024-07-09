//import  SupportHelpType  from 'src/types/SupportHelpType';
import axios from './axiosInstances/privateAxiosInstance';

//const API_URL = 'https://skgevsp4zc-vpce-07b43b2da4181689f.execute-api.us-west-2.amazonaws.com/cc/qs/mock/customfilter';
//const API_URL = 'https://live-alpha.ql2.com/rest/common/help/getuserandcontactdetails';
const API_URL = '/qs/common/help/userandcontactdetails';

export type SupportHelpAPIResponse = {  
  //supportHelp: SupportHelpType;
  phone: string,
  externalEmail: string,
  userName: string,
  userEmail: string
};
 
export const getSupportHelp = (): Promise<SupportHelpAPIResponse> => {
    return axios.get(API_URL);
};