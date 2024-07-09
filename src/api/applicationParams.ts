import axios from './axiosInstances/privateAxiosInstance';
import { useEffect, useState } from 'react';

const API_URL = '/qs/account/user/getappparam';

type applicationPermission = {
  value: boolean;
  name: string;
};

const getApplicationPermissionByName = (name: string, permissions: Array<applicationPermission>) => {
  const foundPermission = permissions.find((item: applicationPermission) => item.name === name);
  return foundPermission ? foundPermission.value : false;
};

export const useApplicationParams = (applicationId: string) => {
  const [permissions, setPermissions] = useState<any>({
    isAutopartsScript: false,
    enableYMME: false,
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (applicationId) {
      if (applicationId === '163') {
        setLoading(true);
        axios &&
          axios
            .get(API_URL, {
              params: {
                appId: applicationId,
                appParams: 'enable_YMME_searching,allow_all_autoparts_script_types',
              },
            })
            .then((response: any) => {
              setLoading(false);
              if (response && response.AppParams) {
                setPermissions({
                  isAutopartsScript: getApplicationPermissionByName(
                    'allow_all_autoparts_script_types',
                    response.AppParams
                  ),
                  enableYMME: getApplicationPermissionByName('enable_YMME_searching', response.AppParams),
                });
              }
            })
            .catch(error => {
              setLoading(false);
              console.log(error);
            });
      } else {
        setPermissions({
          isAutopartsScript: true,
          enableYMME: false,
        });
      }
    }
  }, [applicationId]);

  return [loading, permissions];
};

export const useApplicationProductFinderParams = (applicationId: string) => {
  const [permissions, setPermissions] = useState<{ [key: string]: boolean }>({
    isReadOnlyBenchmark: false,
    isReadOnlyMatch: false,
  });

  useEffect(() => {
    axios &&
      axios
        .get(API_URL, {
          params: {
            appId: applicationId,
            appParams: 'read_only_benchmark,read_only_match',
          },
        })
        .then((response: any) => {
          if (response && response.AppParams) {
            setPermissions({
              isReadOnlyBenchmark: getApplicationPermissionByName('read_only_benchmark', response.AppParams),
              isReadOnlyMatch: getApplicationPermissionByName('read_only_match', response.AppParams),
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
  }, [applicationId]);

  return [permissions];
};


type applicationPermissionResultPage = {
  value: any;
  name: string;
};

const getApplicationPermissionByNameResultPage = (name: string, permissions: Array<applicationPermissionResultPage>) => {
  const foundPermission = permissions.find((item: applicationPermissionResultPage) => item.name === name);
  return foundPermission ? foundPermission.value : 0;
};
export const useApplicationProductResultPageParams = (applicationId: string) => {
  const [permissionssss, setPermissionsss] = useState({
    isResultsView: 0,
  });

  useEffect(() => {
    axios &&
      axios
        .get(API_URL, {
          params: {
            appId: applicationId,
            appParams: 'max_days_for_results_view',
            appType:'int'
          },
        })
        .then((response: any) => {
          if (response && response.AppParams) {
            setPermissionsss({
              isResultsView: getApplicationPermissionByNameResultPage('max_days_for_results_view', response.AppParams),
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
  }, [applicationId]);
  return [permissionssss];
};
