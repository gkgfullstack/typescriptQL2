import axios from './axiosInstances/privateAxiosInstance';
import { useEffect, useState } from 'react';

const API_URL = '/qs/common/help/getraregion';

const transformRegions = (regions: any) => {
  return regions.map((region: any) => {
    return {
      title: region.name,
      key: region.ID ? region.ID : region.id,
      ID: region.ID ? region.ID : region.id,
      zipCode: region.value ? region.value : '',
      children: region.children ? transformRegions(region.children) : [],
    };
  });
};

export const useGetRegionList = (applicationId: string, site: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [regionList, setRegionList] = useState<any>([]);

  useEffect(() => {
    if (applicationId && site) {
      setLoading(true);
      axios &&
        axios
          .get(API_URL, {
            params: {
              appId: applicationId,
              siteCode: site,
            },
          })
          .then((response: any) => {
            if (response && response.regionGroupList) {
              setRegionList(transformRegions(response.regionGroupList));
            }
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
          });
    } else {
      setRegionList([]);
    }
  }, [applicationId, site]);

  return [loading, regionList];
};
