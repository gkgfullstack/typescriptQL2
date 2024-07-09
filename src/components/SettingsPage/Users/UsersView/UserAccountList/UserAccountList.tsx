import React, { useEffect, useState } from 'react';
import styles from './UserAccountList.module.less';
import { Sorting } from 'src/types/Sorting';
import UserAccountTable from './UserAccountTable';
import SORT_ORDER from 'src/enums/sortOrder';
import { UserAccountInfo } from 'src/types/UserAccountInfo';
import { useUpdateUserAccountStatus } from 'src/api/userAccounts';
import EditUserAccount from './EditUserAccount';

export type UserAccountListProps = {
  requestParams: any;
  setRequestParams: any;
  loading: boolean;
  totalRecords: number;
  userAccountList: any;
  isEnableAccount: boolean;
};

export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_NUMBER = 0;

const UserAccountList: React.FC<UserAccountListProps> = ({
  requestParams,
  setRequestParams,
  loading,
  totalRecords,
  userAccountList,
  isEnableAccount,
}: UserAccountListProps): React.ReactElement => {
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [page, setPage] = useState(PAGE_NUMBER);
  const [currentColumn] = useState('accountName');
  const [currentOrder] = useState('ascend');
  const [sorting, setSorting] = useState({ field: currentColumn, order: currentOrder } as Sorting<UserAccountInfo>);
  const [savedAccount, setSavedAccount] = useState<any>(null);
  const onUpdateList = (length: number) => {
    if (page === 0 || !(totalRecords - length < page * pageSize - pageSize + 1)) {
      setRequestParams({
        ...requestParams,
      });
    } else {
      const newPage = page > 1 ? page - 1 : PAGE_NUMBER;
      setPage(newPage);
    }
  };
  useUpdateUserAccountStatus(savedAccount, onUpdateList);
  const [editAccountVisible, setEditAccountVisible] = useState<boolean>(false);
  const [editAccount, setEditAccount] = useState<any>(null);

  const getOffset = (page: number, size: number): string => {
    let offset: string = PAGE_NUMBER.toString();
    if (requestParams && requestParams.size && requestParams.size !== pageSize.toString()) {
      setPage(PAGE_NUMBER);
      return offset;
    }
    offset = (page > 1 ? (page - 1) * size : PAGE_NUMBER).toString();
    return offset;
  };

  useEffect(() => {
    let newParams: any = {
      size: pageSize.toString(),
      offset: getOffset(page, pageSize),
      enableAccount: isEnableAccount,
    };
    if (sorting) {
      newParams = {
        ...newParams,
        sortOrder: SORT_ORDER[sorting.order],
        sortColumn: sorting.field,
      };
    }
    setRequestParams(newParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, sorting]);

  useEffect(() => {
    setPage(PAGE_NUMBER);
    setPageSize(DEFAULT_PAGE_SIZE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEnableAccount]);

  const onSortingChange = (sorting: Sorting<UserAccountInfo>): void => {
    setSorting(sorting);
  };

  const onPageSizeChange = (pageSize: number): void => {
    setPageSize(pageSize);
  };

  const onPageChange = (page: number): void => {
    setPage(page);
  };

  const onAction = (record: any, type: string) => {
    if (type === 'status') {
      setSavedAccount({
        accountId: record.accountId,
        enableAccount: !record.enableAccount,
      });
    }
    if (type === 'edit') {
      setEditAccount(record);
      setEditAccountVisible(true);
    }
  };

  return (
    <div className={styles.user_account_list}>
      <UserAccountTable
        items={userAccountList}
        sorting={sorting}
        loading={loading}
        pageSize={pageSize}
        page={page}
        total={totalRecords}
        onPageSizeChange={onPageSizeChange}
        onPageChange={onPageChange}
        onSortingChange={onSortingChange}
        onAction={onAction}
      />
      <EditUserAccount
        visible={editAccountVisible}
        setVisible={setEditAccountVisible}
        userAccount={editAccount}
        onUpdate={onUpdateList}
      />
    </div>
  );
};

export default UserAccountList;
