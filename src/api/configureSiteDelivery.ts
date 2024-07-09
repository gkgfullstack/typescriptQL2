import { useState, useEffect } from 'react';
import axios from './axiosInstances/privateAxiosInstance';
import ConfigureClientSiteDelivery from 'src/types/ConfigureClientSiteDelivery';

export const useGetSiteDelivery = (id: string | undefined, site: ConfigureClientSiteDelivery | null) => {
  const [siteDelivery, setSiteDelivery] = useState<ConfigureClientSiteDelivery | null>(null);

  useEffect(() => {
    if (id && !site) {
      axios &&
        axios
          .get(`/oc/client/retrieve/${id}/delivery`)
          .then((response: any) => {
            if (response.deliveryInfoResponse && response.deliveryInfoResponse.deliveryInfo[0]) {
              setSiteDelivery(response.deliveryInfoResponse.deliveryInfo[0]);
            }
          })
          .catch(error => {
            console.log(error);
          });
    }
  }, [id, site, setSiteDelivery]);

  return [siteDelivery];
};

export const useSaveSiteDelivery = (
  clientId: string | undefined,
  siteDelivery: ConfigureClientSiteDelivery | null,
  onUpdate: (record: null) => void
) => {
  useEffect(() => {
    if (siteDelivery && clientId) {
      axios &&
        axios
          .post(`/oc/client/add/${clientId}/delivery`, {
            version: '1.6.0',
            request: {
              deliveryInfoRequest: {
                ...siteDelivery,
                clientId: Number(clientId),
              },
            },
          })
          .then(() => {
            if (!siteDelivery.id) {
              onUpdate(null);
            }
          });
    }
  }, [clientId, siteDelivery, onUpdate]);

  return [];
};
