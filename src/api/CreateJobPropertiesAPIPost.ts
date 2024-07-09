//import  CreateJobPropertiesTypePost  from 'src/types/CreateJobPropertiesTypePost';
import axios from './axiosInstances/privateAxiosInstance';

const API_URL = '/qs/searches/updateproperties';
//const API_URL = 'https://skgevsp4zc-vpce-07b43b2da4181689f.execute-api.us-west-2.amazonaws.com/cc/qs/mock';

export type JobPropertiesPostResponse = {  
  updateJobPropertiesItems:any;
};

export const updateJobProperties = (values: any): Promise<JobPropertiesPostResponse> =>{
const data = {
  ...({
    formData:values
  })
}
return axios.post(API_URL, data); 
}
