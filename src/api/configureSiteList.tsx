import axios from './axiosInstances/privateAxiosInstance';
import { useEffect, useState } from 'react';

type ConfigureSiteListRequest = {
  ID?: string;
  name: string;
  bookmarkCreated?: string;
  region?: string;
  active?: boolean;
  dataSource?: string;
  productType?: string;
  imageURL?: string;
  type?: string;
  offset: number;
  size: number;
  sortingColumn?: string;
  sortingOrder?: string;
};

export const useGetConfigureSiteList = (
  clientId: string | undefined,
  params: ConfigureSiteListRequest | null,
  onUpdatePrimaryStatus?: any
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [siteList, setSiteList] = useState<any>([]);

  useEffect(() => {
    if (params && clientId) {
      setLoading(true);
      axios &&
        axios
          .get(`/oc/owner/retrieveall/client/${clientId}`, {
            params: {
              ...params,
            },
          })
          .then((response: any) => {
            if (response) {
              setSiteList(response.ownerResponse.owner);
              setTotalRecords(response.ownerResponse.totalCount);
              if (onUpdatePrimaryStatus && response.ownerResponse.totalCount > 0) {
                onUpdatePrimaryStatus(true);
              } else if (onUpdatePrimaryStatus) {
                onUpdatePrimaryStatus(false);
              }
            }
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
          });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, clientId]);

  return [loading, totalRecords, siteList];
};

export const useGetAllSiteList = (schema: string | undefined) => {
  const [siteList, setSiteList] = useState<any>([]);

  useEffect(() => {
    if (schema) {
      axios &&
        axios
          .get(`/oc/owner/retrieveall`, {
            params: {
              active: 1,
              verticalName: schema,
            },
          })
          .then((response: any) => {
            if (response && response.ownerResponse) {
              setSiteList(response.ownerResponse.owner);
            }
          });
    }
  }, [schema]);

  return [siteList];
};

export const useGetConfigureAllSiteList = (clientId: string | undefined) => {
  const [siteList, setSiteList] = useState<any>([]);

  useEffect(() => {
    if (clientId) {
      axios &&
        axios.get(`/oc/owner/retrieveall/client/${clientId}?sourcesite=-1`).then((response: any) => {
          if (response && response.ownerResponse) {
            setSiteList(response.ownerResponse.owner);
          }
        });
    }
  }, [clientId]);

  return [siteList];
};

export const useGetAllSiteLogoList = () => {
  const [siteLogoList, setSiteLogoList] = useState<any>([]);

  useEffect(() => {
    axios &&
      axios
        .get(`/oc/owner/logos/all`)
        .then((response: any) => {
          if (response && response.ownersLogosResponse) {
            setSiteLogoList(response.ownersLogosResponse.ownersLogos);
          }
        })
        .catch(e => console.log(e));
  }, []);

  return [siteLogoList];
};

export const useAddSiteToClient = (
  siteId: string | null,
  clientId: string | undefined,
  ownerClientLookup: any,
  onUpdate: any,
  setSavedSite?: any
) => {
  useEffect(() => {
    if (siteId && clientId) {
      axios &&
        axios
          .post(`/oc/owner/add/${siteId}/lookup/${clientId}`, {
            version: '1.6.0',
            request: {
              ownerClientLookupRequest: ownerClientLookup,
            },
          })
          .then(() => {
            onUpdate();
            if (setSavedSite) {
              setSavedSite(null);
            }
          })
          .catch(() => {
            if (setSavedSite) {
              setSavedSite(null);
            }
          });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteId, clientId]);

  return [];
};

export const useUpdateSiteStatus = (
  lookupID: string | undefined,
  clientId: string | undefined,
  ownerClientLookup: any,
  onUpdate: any
) => {
  useEffect(() => {
    if (lookupID && clientId) {
      axios &&
        axios
          .post(`/oc/owner/add/${lookupID}/lookup/${clientId}`, {
            version: '1.6.0',
            request: {
              ownerClientLookupRequest: ownerClientLookup,
            },
          })
          .then(() => {
            onUpdate();
          });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lookupID, clientId]);

  return [];
};

export const useDeleteSiteFromClient = (
  siteList: any[],
  clientId: string | undefined,
  setDeletedSiteList: any,
  onUpdate?: any
) => {
  useEffect(() => {
    if (siteList.length > 0 && clientId) {
      siteList.forEach(site => {
        axios &&
          axios.delete(`/oc/owner/delete/${site.ID}/lookup/${clientId}`).then(() => {
            onUpdate(siteList.length);
            setDeletedSiteList([]);
          });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteList, clientId]);

  return [];
};
