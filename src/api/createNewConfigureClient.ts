import { useEffect } from 'react';
import axios from './axiosInstances/privateAxiosInstance';
import ConfigureClientInfo from 'src/types/ConfigureClientInfo';
import { useHistory } from 'react-router-dom';
import { notification } from 'antd';
import routes from 'src/routes';

const API_URL = '/oc/client/add';

const showNotification = (message: string) => {
  notification.error({
    message: 'An error occurred.',
    description: message || 'Something went wrong. Please try again later...',
    duration: 0,
  });
};

export const useCreateNewConfigureClient = (newClient: ConfigureClientInfo | null) => {
  const history = useHistory();

  useEffect(() => {
    if (newClient) {
      axios &&
        axios
          .post(API_URL, {
            version: '1.6.0',
            request: {
              clientRequest: newClient,
            },
          })
          .then((response: any) => {
            if (response.idResponse) {
              history.push({
                pathname: routes.configureClient,
                search: `clientId=${response.idResponse.ID}&name=${newClient.name}&status=true&schema=${newClient.mwsSchema}`,
              });
            } else {
              showNotification(response.responseHeader.statusMessage);
            }
          });
    }
  }, [newClient, history]);

  return [];
};

export const useEditConfigureClient = (
  newClient: ConfigureClientInfo | null,
  requestParams: any,
  setRequestParams: any
) => {
  useEffect(() => {
    if (newClient) {
      axios &&
        axios
          .post(API_URL, {
            version: '1.6.0',
            request: {
              clientRequest: newClient,
            },
          })
          .then(() => {
            setRequestParams({
              ...requestParams,
            });
          });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newClient]);

  return [];
};
