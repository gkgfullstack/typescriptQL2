import axios from './axiosInstances/privateAxiosInstance';
import QualityIndex from 'src/types/QualityIndex';

const API_URL = '/qs/searches/graph/quality-index';

export type QualityIndexResponse = { qualityindex: QualityIndex[] };

export const getQualityIndex = (): Promise<QualityIndexResponse> => {
  return axios.get(API_URL);
};

