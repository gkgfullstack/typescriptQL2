//import  CreateJobPropertiesTypePost  from 'src/types/CreateJobPropertiesTypePost';
import { SiteNotificationsRequest } from 'src/components/SettingsPage/hooks/useSiteNotificationsPostFetch';
import axios from './axiosInstances/privateAxiosInstance';

const API_URL = '/qs/account/settings/saveupdatesitesnotification';
export type SiteNotificationsPostResponse = {  
  settingsUpdatedsss:SiteNotificationsRequest;
  message: string;
};

export const siteNotificationsAPIPost = (values: SiteNotificationsRequest): Promise<SiteNotificationsPostResponse> =>{
// let siteNotificationList;
// for(let i = 0; i < values.siteNotificationList.length; i++){ 
//     siteNotificationList = values.siteNotificationList[i]+","+siteNotificationList;  
// }
// siteNotificationList = siteNotificationList?.replace(',undefined', '') 

const data = {
  ...({
    SiteNotificationData: {
      optMode:values.optMode,
      emailAddresses:values.emailAddresses,
      siteNotificationList:values.siteNotificationList,
      
    }
    
  })
  
}

return axios.post(API_URL, data); 

}
