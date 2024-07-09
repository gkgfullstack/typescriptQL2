import axios from './axiosInstances/privateAxiosInstance';
import { useEffect, useState } from 'react';

const API_URL = '/qs/account/user/getappparam';

type applicationPermissionTable = {
  value: boolean;
  name: string;
};

const getApplicationPermissionByNameForTable = (name: string, permissions: Array<applicationPermissionTable>) => {
  const foundPermission = permissions.find((item: applicationPermissionTable) => item.name === name);
  return foundPermission ? foundPermission.value : false;
};

export const useUserPermissionTableCreate = (applicationId: string) => {
  const [permissions, setPermissions] = useState<any>({
    enablePTC: false,
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
              appParams: 'priv_table_create',
            },
          })
          .then((response: any) => {
            setLoading(false);
            if (response && response.AppParams) {
              setPermissions({
                enablePTC: getApplicationPermissionByNameForTable('priv_table_create', response.AppParams),
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
