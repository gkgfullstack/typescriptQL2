import axios from './axiosInstances/privateAxiosInstance';
import { useEffect, useState } from 'react';
import ConfigureRegionQueryParams from 'src/types/ConfigureRegionQueryParams';

export const useGetConfigureRegionList = (
  clientId: string | undefined,
  siteId: string | undefined,
  params: ConfigureRegionQueryParams
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [siteList, setSiteList] = useState<any>([]);

  useEffect(() => {
    if (params && params.pagesize && siteId) {
      const requestParams: any = {
        params: {
          ...params,
        },
      };
      if (clientId) {
        requestParams.headers = {
          clientid: clientId,
        };
      }
      setLoading(true);
      axios &&
        axios
          .get(`/oc/region/retrieveall/owner/${siteId}`, requestParams)
          .then((response: any) => {
            if (response) {
              setSiteList(response.regionResponse.region);
              setTotalRecords(response.regionResponse.totalCount);
            }
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
          });
    }
  }, [params, siteId, clientId]);

  return [loading, totalRecords, siteList];
};

export const useCreateNewConfigureRegion = (
  clientId: string | undefined,
  newRegion: any,
  onUpdate: any,
  schema?: string | undefined
) => {
  useEffect(() => {
    if (newRegion) {
      const headers = clientId
        ? {
            clientid: clientId,
          }
        : {};
      const params = schema
        ? {
            verticalName: schema,
          }
        : {};
      axios &&
        axios
          .post(
            '/oc/region/add',
            {
              version: '1.6.0',
              request: {
                regionRequest: newRegion,
              },
            },
            {
              headers: headers,
              params: params,
            }
          )
          .then(() => {
            onUpdate();
          });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientId, newRegion]);

  return [];
};

export const useDeleteRegionFromSite = (
  clientId: string | undefined,
  regionList: any[],
  setDeletedRegionList: any,
  onUpdate?: any,
  schema?: string | undefined
) => {
  useEffect(() => {
    if (regionList.length > 0) {
      const headers = clientId
        ? {
            clientid: clientId,
          }
        : {};
      const params = schema
        ? {
            verticalName: schema,
          }
        : {};
      regionList.forEach(region => {
        axios &&
          axios
            .delete(`/oc/region/delete/${region.ID}`, {
              headers: headers,
              params: params,
            })
            .then(() => {
              onUpdate(regionList.length);
              setDeletedRegionList([]);
            });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regionList, clientId]);

  return [];
};
