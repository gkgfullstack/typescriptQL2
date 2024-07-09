import { useEffect, useState } from 'react';
import axios from './axiosInstances/privateAxiosInstance';

type UserAccountListRequest = {
  offset: string;
  size: string;
  sortColumn: string;
  sortOrder: string;
  enableAccount: string;
};

export const useGetUserAccounts = (params: UserAccountListRequest | null) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [userAccountList, setUserAccountList] = useState<any>([]);
  const [userDisabledCount, setUserDisabledCount] = useState<string>('');

  useEffect(() => {
    if (params) {
      setLoading(true);
      axios &&
        axios
          .post(`/qs/account/settings/getusersettings`, {
            UserSettingsPojo: params,
          })
          .then((response: any) => {
            setLoading(false);
            if (response) {
              setTotalRecords(Number(response.totalCount));
              setUserDisabledCount(response.userDisabledCount);
              setUserAccountList(response.userSettings);
            }
          })
          .catch(() => {
            setLoading(false);
          });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return [loading, totalRecords, userAccountList, userDisabledCount];
};

export const useCreateUserAccount = (UserAccount: any, onUpdate: any, setErrorMessage: any, setVisible: any) => {
  useEffect(() => {
    if (UserAccount) {
      setErrorMessage('');
      axios &&
        axios
          .post(`/qs/account/settings/createupdateuseraccount`, {
            CreateUpdateUserSettings: UserAccount,
          })
          .then((response: any) => {
            if (response && response.statusCode === 409) {
              setErrorMessage('Account name already exists');
            } else if (response && onUpdate) {
              onUpdate();
              setVisible(false);
            }
          });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [UserAccount]);

  return [];
};

export const useUpdateUserAccountStatus = (UserAccount: any, onUpdateList: any) => {
  useEffect(() => {
    if (UserAccount) {
      axios &&
        axios
          .post(`/qs/account/settings/enableuseraccount`, {
            CreateUpdateUserSettings: UserAccount,
          })
          .then((response: any) => {
            if (response) {
              onUpdateList();
            }
          });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [UserAccount]);

  return [];
};
