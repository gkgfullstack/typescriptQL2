//import  CreateJobPropertiesTypePost  from 'src/types/CreateJobPropertiesTypePost';
import axios from './axiosInstances/privateAxiosInstance';

//const API_URL = 'https://live-alpha.ql2.com/rest/account/updatepassword';
const API_URL = '/qs/account/user/updatepassword';
//const API_URL = 'https://skgevsp4zc-vpce-07b43b2da4181689f.execute-api.us-west-2.amazonaws.com/cc/qs/mock';

export type ChangePasswordPostResponse = {  
  updateChangePassword:any;
};

export const updatePassword = (values: any): Promise<ChangePasswordPostResponse> =>{
//let arr = Object.keys(values).toString();
const data = {
  ...({
    updatepassword:values,
  })
}
return axios.post(API_URL, data); 
}
