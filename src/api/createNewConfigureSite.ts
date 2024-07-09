import { useEffect } from 'react';
import axios from './axiosInstances/privateAxiosInstance';
import { ConfigureClientSitesTableInfo } from 'src/types/ConfigureClientSitesTableInfo';

const API_URL = '/oc/owner/add';

export const useCreateNewConfigureSite = (
  clientId: string | undefined,
  newSite: ConfigureClientSitesTableInfo | null,
  onUpdate: any,
  onAddSite?: any
) => {
  useEffect(() => {
    if (clientId && newSite) {
      axios &&
        axios
          .post(
            API_URL,
            {
              version: '1.6.0',
              request: {
                ownerRequest: newSite,
              },
            },
            {
              headers: {
                clientid: clientId,
              },
            }
          )
          .then((response: any) => {
            if (newSite.ID) {
              onUpdate();
            } else if (response && response.ownerResponse) {
              onAddSite(response.ownerResponse.owner);
            }
          });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newSite]);

  return [];
};

export const useCreateNewSite = (
  newSite: ConfigureClientSitesTableInfo | null,
  onUpdate?: any,
  schema?: string | undefined
) => {
  const params = schema ? { verticalName: schema } : {};

  useEffect(() => {
    if (newSite) {
      axios &&
        axios
          .post(
            API_URL,
            {
              version: '1.6.0',
              request: {
                ownerRequest: newSite,
              },
            },
            {
              params: params,
            }
          )
          .then(() => {
            if (onUpdate) {
              onUpdate();
            }
          })
          .catch(e => console.log(e));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newSite]);

  return [];
};
