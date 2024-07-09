import axios from './axiosInstances/privateAxiosInstance';
import { ResponseHeader } from 'src/types/ResponseHeader';

const API_URL = '/qs/account/user/removetoken';

export const logout = (): Promise<ResponseHeader> => {
  return axios.get(API_URL);
};
