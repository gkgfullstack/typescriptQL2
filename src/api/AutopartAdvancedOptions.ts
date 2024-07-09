import { useEffect, useState } from 'react';
import axios from 'src/api/axiosInstances/privateAxiosInstance';

const API_URL = '/qs/common/getymmemodel';

export const useGetYearOptionValues = (appId: string, siteCode: string) => {
  const [years, setYears] = useState<string[]>([]);
  useEffect(() => {
    if (appId && siteCode) {
      axios &&
        axios
          .get(API_URL, { params: { appId, siteCode } })
          .then((response: any) => {
            if (response) {
              setYears(response.fitmentResponse);
            }
          })
          .catch(error => {
            console.log(error);
          });
    } else {
      setYears([]);
    }
  }, [appId, siteCode]);

  return [years];
};

export const useGetMakeOptionValues = (appId: string, siteCode: string, year: string) => {
  const [makeCompanies, setMakeCompanies] = useState<string[]>([]);

  useEffect(() => {
    if (appId && siteCode && year) {
      axios &&
        axios
          .get(API_URL, { params: { appId, siteCode, year } })
          .then((response: any) => {
            if (response) {
              const result = response.fitmentResponse.sort();
              setMakeCompanies(result);
            }
          })
          .catch(error => {
            console.log(error);
          });
    } else {
      setMakeCompanies([]);
    }
  }, [appId, siteCode, year]);

  return [makeCompanies];
};

export const useGetModelOptionValues = (appId: string, siteCode: string, year: string, make: string) => {
  const [models, setModels] = useState<string[]>([]);

  useEffect(() => {
    if (appId && siteCode && year && make) {
      axios &&
        axios
          .get(API_URL, { params: { appId, siteCode, year, make } })
          .then((response: any) => {
            if (response) {
              const result = response.fitmentResponse.sort();
              setModels(result);
            }
          })
          .catch(error => {
            console.log(error);
          });
    } else {
      setModels([]);
    }
  }, [appId, siteCode, year, make]);

  return [models];
};

export const useGetEngineOptionValues = (
  appId: string,
  siteCode: string,
  year: string,
  make: string,
  model: string
) => {
  const [engines, setEngines] = useState<string[]>([]);

  useEffect(() => {
    if (appId && siteCode && year && make && model) {
      axios &&
        axios
          .get(API_URL, { params: { appId, siteCode, year, make, model } })
          .then((response: any) => {
            if (response) {
              const result = response.fitmentResponse.sort();
              setEngines(result);
            }
          })
          .catch(error => {
            console.log(error);
          });
    } else {
      setEngines([]);
    }
  }, [appId, siteCode, year, make, model]);

  return [engines];
};
