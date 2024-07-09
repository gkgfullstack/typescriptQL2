import { useState, useEffect } from 'react';
import axios from './axiosInstances/privateAxiosInstance';
import ConfigureClientSiteDetails from 'src/types/ConfigureClientSiteDetails';

export const useGetSiteDetails = (id: string | undefined) => {
  const [siteDetails, setSiteDetails] = useState<ConfigureClientSiteDetails | null>(null);

  useEffect(() => {
    if (id) {
      axios &&
        axios.get(`/oc/client/retrieve/${id}/details`).then((response: any) => {
          if (response.clientDetailsResponse) {
            setSiteDetails(response.clientDetailsResponse.clientDetails);
          }
        });
    }
  }, [id, setSiteDetails]);

  return [siteDetails];
};

export const useSaveSiteDetails = (
  id: string | undefined,
  siteDetails: ConfigureClientSiteDetails | null,
  updateIndustry: any
) => {
  useEffect(() => {
    if (id && siteDetails) {
      axios &&
        axios
          .post(`/oc/client/add/${id}/details`, {
            version: '1.6.0',
            request: {
              clientDetailsRequest: {
                ...siteDetails,
                clientId: Number(id),
              },
            },
          })
          .then(() => {
            updateIndustry(true);
          });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteDetails, id]);

  return [];
};
