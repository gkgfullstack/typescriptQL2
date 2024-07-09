import axios from './axiosInstances/privateAxiosInstance';
import { useEffect, useState } from 'react';

const API_URL = '/oc/owner/retrieveall';

type SiteManagementListRequest = {
  siteName?: string;
  verticalName?: string;
  pagesize?: number;
  pagestart?: number;
  sortingcolumn?: string;
  sortingorder?: string;
};

export const useGetSiteManagementList = (params: SiteManagementListRequest | null) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [siteList, setSiteList] = useState<any>([]);

  useEffect(() => {
    if (params && params.verticalName) {
      setLoading(true);
      axios &&
        axios
          .get(API_URL, {
            params: params,
          })
          .then((response: any) => {
            if (response) {
              setSiteList(response.ownerResponse.owner);
              setTotalRecords(response.ownerResponse.totalCount);
            }
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
          });
    } else {
      setSiteList([]);
      setTotalRecords(0);
    }
  }, [params]);

  return [loading, totalRecords, siteList];
};

export const useGetAllClientsOfSiteList = (siteId: string | undefined, params: SiteManagementListRequest | null) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [clientList, setClientList] = useState<any>([]);

  useEffect(() => {
    if (siteId && params && params.verticalName) {
      setLoading(true);
      axios &&
        axios
          .get(`/oc/owner/retrieveall/${siteId}/clients`, {
            params: params,
          })
          .then((response: any) => {
            if (response) {
              setClientList(response.clientResponse.client);
              setTotalRecords(response.clientResponse.totalCount);
            }
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
          });
    } else {
      setClientList([]);
      setTotalRecords(0);
    }
  }, [siteId, params]);

  return [loading, totalRecords, clientList];
};
