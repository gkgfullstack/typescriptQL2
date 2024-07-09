import axios from './axiosInstances/privateAxiosInstance';

const API_URL = '/qs/searches/lineitemdtlsummary';


export type SearchDtlSummaryResponse = {
  applicationName: string;
  ownerName: string;
  jobName: string;
  createdAt: string;
  totalInput: Number;
  totalOutput: Number;
  estimatedTime: string;
  status: string;
  dwnLdType: string;
};

export const getSearchDtlSummary = (jobId: string): Promise<SearchDtlSummaryResponse> => {
  return axios.get(API_URL, {
    params: {
      jobId: jobId,
    },
  });
};


