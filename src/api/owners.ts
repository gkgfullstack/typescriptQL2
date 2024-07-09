import axios from './axiosInstances/privateAxiosInstance';
import Owner from 'src/types/Owner';

const API_URL = '/qm/sourceowner';

export type OwnersResponse = {
  sourceOwner: Owner[];
};

export const getOwners = (): Promise<OwnersResponse> => {
  return axios.get(API_URL);
};
