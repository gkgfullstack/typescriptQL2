import axios from './axiosInstances/privateAxiosInstance';

const API_URL = '/qr/interactive/reports';

const API_DEFINED_URL = '/qr/interactive/reporturl';

export type InteractiveReportsResponse = {
  reports: InteractiveReportsType[];
};

export type InteractiveReportsType = {
  id: string;
  reportName: string;  
};

export const getInteractiveReports = (): Promise<InteractiveReportsResponse> => {
  return axios.get(API_URL);
};

export type DefinedReportResponse = {
  reportURL: string;
};

export const getDefinedReportURL = (reportName:string): Promise<DefinedReportResponse> => {
  return axios.get(API_DEFINED_URL, {
    params: {
      reportName: reportName,
    },

  });
};
