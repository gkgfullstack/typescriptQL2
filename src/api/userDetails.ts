import axios from './axiosInstances/axiosInstance';
import AppPermissionName from 'src/types/AppPermissionName';

export type AppParam = {
  name: AppPermissionName;
  value: boolean;
};

export type UserDetailsResponse = {
  userId: string;
  userName: string;
  appParam: AppParam[];
  timeZone: string;
  dateFormat: string;
  baseURL: string;
  accountId:Number;
  orgId:Number;
  orgName:string;
  environment:string;
  crm_name:string;
  pendoUserId: string;
  changePasswordFlag:any;
  hasAppAdminPriv:Boolean;
  
};

const API_URL = '/qs/account/user/getdetails';

export const getUserDetails = (token: string): Promise<UserDetailsResponse> => {
  return axios.get(API_URL, {
    params: {
      token: token,
    },
  });
};
