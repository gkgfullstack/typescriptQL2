import axios from './axiosInstances/privateAxiosInstance';
import { useEffect, useState } from 'react';

const API_URL = '/oc/client/retrievelist';

type ConfigureClientListRequest = {
  name?: string;
  industry?: string;
  mwsSchema?: string;
  offset: number;
  size: number;
  sortingColumn?: string;
  sortingOrder?: string;
};

export const useGetConfigureClientList = (params: ConfigureClientListRequest | null) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [clientList, setClientList] = useState<any>([]);

  useEffect(() => {
    if (params) {
      setLoading(true);
      axios &&
        axios
          .get(API_URL, {
            params: params,
          })
          .then((response: any) => {
            if (response.clientResponse) {
              setClientList(response.clientResponse.client);
              setTotalRecords(response.clientResponse.totalCount);
            }
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
          });
    }
  }, [params]);

  return [loading, totalRecords, clientList];
};
