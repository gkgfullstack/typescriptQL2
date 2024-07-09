import axios from './axiosInstances/privateAxiosInstance';

const API_URL = '/qs/account/user/getreporturl';
const API_URL_AST='/qs/account/user/getassortmentrpturl'

export type TableauReportResponse = {
  reportURL: string;
};

export const getTableauReport = (): Promise<TableauReportResponse> => {
  return axios.get(API_URL);
};

export const getAssortmentReport = (): Promise<TableauReportResponse> => {
  return axios.get(API_URL_AST);
};
