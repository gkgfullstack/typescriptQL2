import { useState, useEffect } from 'react';
import axios from './axiosInstances/privateAxiosInstance';

const API_URL = '/oc/region/group/retrieveall';

export const useGetRegionStates = (clientId: string | undefined) => {
  const [states, setStates] = useState([]);

  useEffect(() => {
    const headers = clientId
      ? {
          clientid: clientId,
        }
      : {};
    axios &&
      axios
        .get(API_URL, {
          headers: headers,
        })
        .then((response: any) => {
          setStates(response.regionGroupResponse.regionGroup);
        })
        .catch(error => {
          console.log(error);
        });
  }, [setStates, clientId]);

  return [states];
};
