import { SupportUploadRequest } from 'src/components/SupportPage/hooks/useSupportHelpPostFetch';
import axios from './axiosInstances/privateAxiosInstance';

//const API_URL = 'https://live-alpha.ql2.com/rest/common/help/saveandupdateticket';
const API_URL = '/qs/common/help/saveandupdateticket';

export type SupportHelpPostResponse = {  
  projectTaskPojo:SupportUploadRequest;
  message: string;
};

export const updateSupportHelpPost = (
  values: SupportUploadRequest
  ): Promise<SupportHelpPostResponse> =>{
    var bodyFormData = new FormData();   
    bodyFormData.set('file', values.file);
    bodyFormData.set('uploadId', 'yes');
    bodyFormData.set('date', values.date);
    bodyFormData.set('username', values.username);
    bodyFormData.set('appname', values.appname);
    bodyFormData.set('producttype', values.producttype);
    bodyFormData.set('jobname', values.jobname);
    bodyFormData.set('appid', values.appid);
    bodyFormData.set('site', values.site);
    bodyFormData.set('subject', values.subject);
    bodyFormData.set('description', values.description);
    bodyFormData.set('input', values.input);
    bodyFormData.set('problem', values.problem);
    bodyFormData.set('replyto', values.replyto);
return axios.post(API_URL,  bodyFormData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
}); 
}

