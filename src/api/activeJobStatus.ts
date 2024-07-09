import axios from './axiosInstances/privateAxiosInstance';
import { useEffect, useState } from 'react';

type JobStatusListRequest = {
  id: string | undefined;
  offset?: number;
  size?: number;
  sortingcolumn?: string;
  sortingorder?: string;
};

const API_URL = '/qs/result/runstatusdetail';

export const useGetActiveJobsStatus = (params: JobStatusListRequest | null) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [statusList, setStatusList] = useState<any>([]);

  useEffect(() => {
    if (params && params.id) {
      setLoading(true);
      axios &&
        axios
          .get(API_URL, {
            params: { ...params },
          })
          .then((response: any) => {
            if (response) {
              setStatusList(response);
              setTotalRecords(response.length);
            }
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
          });
    } else {
      setStatusList([]);
      setTotalRecords(0);
    }
  }, [params]);

  return [loading, totalRecords, statusList];
};
