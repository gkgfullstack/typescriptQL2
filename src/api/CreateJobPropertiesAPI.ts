import  CreateJobPropertiesType  from 'src/types/CreateJobPropertiesType';
import axios from './axiosInstances/privateAxiosInstance';

const API_URL = '/qs/searches/getpropertiesdata';
//const API_URL = 'https://skgevsp4zc-vpce-07b43b2da4181689f.execute-api.us-west-2.amazonaws.com/cc/qs/mock';

export type JobPropertiesResponse = {  
  jobProperties: CreateJobPropertiesType };

export const getJobProperties = (jobId: string): Promise<JobPropertiesResponse> =>
  axios.get(API_URL, { params: { jobId: jobId } }); 
