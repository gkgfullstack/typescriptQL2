import { Sorting } from 'src/types/Sorting';
import { ColumnProps, SortOrder } from 'antd/lib/table';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../UserAccountList.module.less';
import { faEdit, faToggleOff, faToggleOn } from '@fortawesome/pro-light-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { UserAccountInfo } from 'src/types/UserAccountInfo';
import moment from 'moment';

interface ColumnConfig extends ColumnProps<UserAccountInfo> {
  customColRenderer?: (dataIndex: UserAccountInfo) => React.ReactNode;
}

const faEditIcon = faEdit as IconProp;
const faToggleOffIcon = faToggleOff as IconProp;
const faToggleOnIcon = faToggleOn as IconProp;

export const sortOrder = (
  sortedInfo: Sorting<UserAccountInfo> | null,
  key: keyof UserAccountInfo
): SortOrder | boolean => {
  return sortedInfo && sortedInfo.field === key ? sortedInfo.order : false;
};

export const actionRender = (record: any, onAction: any) => {
  const onIconClick = (type: string) => {
    return () => {
      onAction(record, type);
    };
  };

  return (
    <>
      <FontAwesomeIcon
        icon={faEditIcon}
        className={styles.action_icon}
        title={'Edit Account'}
        onClick={onIconClick('edit')}
      />
    </>
  );
};

const renderTimeField = (value: string) => {
  return value ? <span>{moment(value).format('YYYY-MM-DD HH:mm:ss')}</span> : '';
};

export const statusRender = (record: { enableAccount: string }, onAction: any) => {
  const onIconClick = (type: string) => {
    return () => {
      onAction(record, type);
    };
  };

  return (
    <p className={styles.status_icon}>
      {record.enableAccount ? (
        <FontAwesomeIcon
          onClick={onIconClick('status')}
          icon={faToggleOnIcon}
          className={styles.status_active_icon}
          size="lg"
        />
      ) : (
        <FontAwesomeIcon
          onClick={onIconClick('status')}
          icon={faToggleOffIcon}
          className={styles.status_inactive_icon}
          size="lg"
        />
      )}
    </p>
  );
};

export const getColumns = (sorting: any, onAction: any) => {
  const columns: ColumnConfig[] = [
    {
      title: 'Account Name',
      key: 'accountName',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => <span>{record.accountName}</span>,
      sortOrder: sortOrder(sorting, 'accountName'),
      sorter: true,
      width: 70,
    },
    {
      title: 'Last Login',
      key: 'lastLogin',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => <span>{renderTimeField(record.lastLogin)}</span>,
      sortOrder: sortOrder(sorting, 'lastLogin'),
      sorter: true,
      width: 200,
    },
    {
      title: 'Last Password Change',
      key: 'lastPasswordChange',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => <span>{renderTimeField(record.lastPasswordChange)}</span>,
      sortOrder: sortOrder(sorting, 'lastPasswordChange'),
      sorter: true,
      width: 120,
    },
    {
      title: 'Status',
      key: 'enableAccount',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => statusRender(record, onAction),
      sortOrder: sortOrder(sorting, 'enableAccount'),
      sorter: true,
      width: 120,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: record => actionRender(record, onAction),
      width: 120,
    },
  ];

  return columns;
};
