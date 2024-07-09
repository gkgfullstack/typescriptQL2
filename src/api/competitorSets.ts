import { useEffect, useState } from 'react';
import axios from './axiosInstances/privateAxiosInstance';
import auth from 'src//services/auth';

const API_URL = '/qs/compset/getcompsetlist';
export type CompetitiveSetsRequest = {
  offset: string;
  size: string;
  sortColumn: string;
  sortOrder: string;
};

export const useGetCompetitiveSets = (params: CompetitiveSetsRequest | null) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [competitiveSetList, setCompetitiveSetList] = useState<any>([]);

  useEffect(() => {
    if (params) {
      const userId = auth.getUserId();
      setLoading(true);
      axios &&
        axios
          .get(API_URL, {
            params: {
              ...params,
              sortingcolumn: params.sortColumn,
              sortingorder: params.sortOrder,
            },
            headers: {
              userId,
            },
          })
          .then((response: any) => {
            if (response) {
              setCompetitiveSetList(response.ComSetModelList);
              setTotalRecords(response.totalCount);
            }
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
          });
    }
  }, [params]);

  return [loading, totalRecords, competitiveSetList];
};
