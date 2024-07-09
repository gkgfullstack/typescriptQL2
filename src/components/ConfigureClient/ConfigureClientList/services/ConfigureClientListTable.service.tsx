import { Sorting } from 'src/types/Sorting';
import { ColumnProps, SortOrder } from 'antd/lib/table';
import ConfigureClientTableInfo from 'src/types/ConfigureClientTableInfo';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../ConfigureClientList.module.less';
import { faToggleOn, faToggleOff } from '@fortawesome/pro-light-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Link } from 'react-router-dom';
import routes from 'src/routes';

interface ColumnConfig extends ColumnProps<ConfigureClientTableInfo> {
  customColRenderer?: (dataIndex: ConfigureClientTableInfo) => React.ReactNode;
}

const faToggleOnIcon = faToggleOn as IconProp;
const faToggleOffIcon = faToggleOff as IconProp;

export const sortOrder = (
  sortedInfo: Sorting<ConfigureClientTableInfo> | null,
  key: keyof ConfigureClientTableInfo
): SortOrder | boolean => {
  return sortedInfo && sortedInfo.field === key ? sortedInfo.order : false;
};

export const statusRender = (record: { active: boolean }, onAction: any) => {
  return (
    <p className={styles.status_icon}>
      {record.active ? (
        <FontAwesomeIcon onClick={onAction(record)} icon={faToggleOnIcon} className={styles.status_active_icon} size="lg" />
      ) : (
        <FontAwesomeIcon
          onClick={onAction(record)}
          icon={faToggleOffIcon}
          className={styles.status_inactive_icon}
          size="lg"
        />
      )}
    </p>
  );
};

export const clientNameRender = (record: any) => {
  return (
    <Link
      to={`${routes.configureClient}?clientId=${record.ID}&name=${record.name}&status=${record.active}&schema=${record.mwsSchema}`}
    >
      {record.name}
    </Link>
  );
};

export const getColumns = (sorting: any, onAction: any) => {
  const columns: ColumnConfig[] = [
    {
      title: 'Client ID',
      key: 'ID',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => <span>{record.ID}</span>,
      sortOrder: sortOrder(sorting, 'ID'),
      sorter: true,
      width: 70,
    },
    {
      title: 'Client Name',
      key: 'name',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => clientNameRender(record),
      sortOrder: sortOrder(sorting, 'name'),
      sorter: true,
      width: 200,
    },
    {
      title: 'Industry',
      key: 'industry',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => <span>{record.industry}</span>,
      sortOrder: sortOrder(sorting, 'industry'),
      sorter: true,
      width: 120,
    },
    {
      title: 'Vertical',
      key: 'mwsSchema',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => <span>{record.mwsSchema}</span>,
      sortOrder: sortOrder(sorting, 'mwsSchema'),
      sorter: true,
      width: 120,
    },
    {
      title: 'Client Status',
      key: 'active',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => statusRender(record, onAction),
      sortOrder: sortOrder(sorting, 'active'),
      sorter: true,
      width: 120,
    },
  ];

  return columns;
};
