import React, { useEffect, useState } from 'react';
import UserAccountFilters from './UserAccountFilters';
import UserAccountList from './UserAccountList';
import { useGetUserAccounts } from 'src/api/userAccounts';

type UsersViewProps = {};

const UsersView: React.FC<UsersViewProps> = () => {
  const [isEnableAccount, setEnableAccount] = useState(true);
  const [requestParams, setRequestParams] = useState<any>(null);
  const [loading, totalRecords, userAccountList, userDisabledCount] = useGetUserAccounts(requestParams);

  useEffect(() => {
    setRequestParams({
      offset: '0',
      size: '10',
      sortColumn: 'accountName',
      sortOrder: 'asc',
      enableAccount: isEnableAccount,
    });
  }, [isEnableAccount]);

  const getFilters = (name: string, value: string) => {
    if (name === 'isUserAccountDisabled') {
      setEnableAccount(value === '1');
    }
  };

  const onUpdateAccountList = () => {
    setRequestParams({ ...requestParams });
  };

  return (
    <>
      <UserAccountFilters setParams={getFilters} userDisabledCount={userDisabledCount} onUpdate={onUpdateAccountList} />
      <UserAccountList
        requestParams={requestParams}
        setRequestParams={setRequestParams}
        isEnableAccount={isEnableAccount}
        loading={loading}
        totalRecords={totalRecords}
        userAccountList={userAccountList}
      />
    </>
  );
};

export default UsersView;
