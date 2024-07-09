import axios from './axiosInstances/privateAxiosInstance';

const API_URL = '/qs/searches/jobaction';

export type JobActionInputs = {
   jobIds: string,
   jobAction: string,
   runIds: string,
   softAbort: string,
   highPriority: String,
   reAssignName: String
};
export type JobActionResponse = {
   message: string;
};


export const getJobSearchAction = (jobActionInputs: JobActionInputs): Promise<JobActionResponse> => {
   const data = {
      ...({
         JobActionInput: {
            jobIds: jobActionInputs.jobIds,
            jobAction: jobActionInputs.jobAction,
            runIds: jobActionInputs.runIds,
            softAbort: jobActionInputs.softAbort,
            highPriority: jobActionInputs.highPriority,
            reAssignName: jobActionInputs.reAssignName
         }
      }),
   };
   return axios.post(API_URL, data);
};
