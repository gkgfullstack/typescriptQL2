import axios from './axiosInstances/privateAxiosInstance';
import { useEffect, useState } from 'react';

const API_URL = '/qs/account/user/getappparam';

type applicationPermissionSearchType = {
  value: string;
  name: string;
};

const getApplicationPermissionByNameForSearchType = (name: string, permissions: Array<applicationPermissionSearchType>) => {
  const foundPermission = permissions.find((item: applicationPermissionSearchType) => item.name === name ? item.value : "F");
  return foundPermission ? foundPermission.value : "F";
};

export const useUserPermissionSearchType = (applicationId: string) => {
  const [permissions, setPermissions] = useState<any>({
    enableDST:"F"
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (applicationId) {
      setLoading(true);
      axios &&
        axios
          .get(API_URL, {
            params: {
              appId: applicationId,
              appParams: 'default_search_type:string'
            },
          })
          .then((response: any) => {
            setLoading(false);
            if (response && response.AppParams) {
              setPermissions({
                enableDST: getApplicationPermissionByNameForSearchType(
                  'default_search_type:string',
                  response.AppParams
                ),
              });
            }
          })
          .catch(error => {
            setLoading(false);
            console.log(error);
          });
    }
  }, [applicationId]);

  return [loading, permissions];
};