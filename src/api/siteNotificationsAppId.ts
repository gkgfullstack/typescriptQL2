import ApplicationFilterType from 'src/types/ApplicationFilterType';
//import  SiteNotificationType  from 'src/types/SiteNotificationType';
import axios from './axiosInstances/privateAxiosInstance';


//const API_URL = '/qs/account/settings/sitenotificationlist';
const API_URLApplications = '/qs/account/user/vertical';

export type AppIdResponse = {
  vertical: ApplicationFilterType[];
};


// export type SiteNotificationAPIResponse = {  
//   siteNotificationList:any;
// };
 
// export const getSiteNotificationAPI = (getAppIdandKey:any): Promise<SiteNotificationAPIResponse> => {
//   return axios.get(API_URL, {
//     params: {
//       appId: getAppIdandKey,
//     },
//   });
// };

export const getAppId = (enableAdmin?: boolean): Promise<AppIdResponse> => {
  return axios.get(API_URLApplications, {
    params: {
      ...(enableAdmin && { enableAdmin }),
    },
  });
};
