import axios from './axiosInstances/privateAxiosInstance';
import Competitor from 'src/types/Competitor';

const API_URL = '/qm/competitor/list';

export type CompetitorsResponse = {
  competitorList: Competitor[];
};

export const getCompetitors = (): Promise<CompetitorsResponse> => {
  return axios.get(API_URL);
};
