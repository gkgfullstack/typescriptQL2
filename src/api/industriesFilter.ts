import { useState, useEffect } from 'react';
import axios from './axiosInstances/privateAxiosInstance';
import auth from 'src/services/auth';

const API_URL = '/oc/industry/retrieveall';

export const useGetIndustries = () => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const userId = auth.getUserId();
    axios &&
      axios
        .get(API_URL, {
          params: {
            userId,
          },
        })
        .then((response: any) => {
          setOptions(response.industryResponse.industry);
        })
        .catch(error => {
          console.log(error);
        });
  }, [setOptions]);

  return [options];
};

export const useUpdateIndustries = (isIndustryUpdated: boolean, updateIndustry: any) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const userId = auth.getUserId();
    if (isIndustryUpdated) {
      axios &&
        axios
          .get(API_URL, {
            params: {
              userId,
            },
          })
          .then((response: any) => {
            setOptions(response.industryResponse.industry);
            updateIndustry(false);
          })
          .catch(error => {
            console.log(error);
            updateIndustry(false);
          });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIndustryUpdated]);

  return [options];
};
