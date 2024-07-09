import { Sorting } from 'src/types/Sorting';
import { ColumnProps, SortOrder } from 'antd/lib/table';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOff, faToggleOn } from '@fortawesome/pro-light-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import ConfigureRegionInfo from 'src/types/ConfigureRegionInfo';
import styles from '../ConfigurationSiteRegionTable.module.less';

interface ColumnConfig extends ColumnProps<any> {
  customColRenderer?: (dataIndex: ConfigureRegionInfo) => React.ReactNode;
}

const faToggleOnIcon = faToggleOn as IconProp;
const faToggleOffIcon = faToggleOff as IconProp;

const sortOrder = (
  sortedInfo: Sorting<ConfigureRegionInfo> | null,
  key: keyof ConfigureRegionInfo
): SortOrder | boolean => {
  return sortedInfo && sortedInfo.field === key ? sortedInfo.order : false;
};

const statusRender = (record: any, onAction: any) => {
  return (
    <p>
      {record.active ? (
        <FontAwesomeIcon icon={faToggleOnIcon} onClick={onAction(record)} className={styles.status_active_icon} size="lg" />
      ) : (
        <FontAwesomeIcon
          icon={faToggleOffIcon}
          onClick={onAction(record)}
          className={styles.status_inactive_icon}
          size="lg"
        />
      )}
    </p>
  );
};

export const getColumns = (sorting: any, onStatusChange: any) => {
  const columns: ColumnConfig[] = [
    {
      title: 'Region Name',
      key: 'name',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => <span>{record.name}</span>,
      sortOrder: sortOrder(sorting, 'name'),
      sorter: true,
      width: 70,
    },
    {
      title: 'Region ID',
      key: 'ID',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => <span>{record.ID}</span>,
      sortOrder: sortOrder(sorting, 'ID'),
      sorter: true,
      width: 70,
    },
    {
      title: 'City',
      key: 'city',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => <span>{record.city}</span>,
      sortOrder: sortOrder(sorting, 'city'),
      sorter: true,
      width: 100,
    },
    {
      title: 'State',
      key: 'state',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => <span>{record.state}</span>,
      sortOrder: sortOrder(sorting, 'state'),
      sorter: true,
      width: 100,
    },
    {
      title: 'Zip Code',
      key: 'zipCode',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => <span>{record.zipCode}</span>,
      sortOrder: sortOrder(sorting, 'zipCode'),
      sorter: true,
      width: 200,
    },
    {
      title: 'Country',
      key: 'country',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => <span>{record.country}</span>,
      sortOrder: sortOrder(sorting, 'country'),
      sorter: true,
      width: 200,
    },
    {
      title: 'Active',
      key: 'active',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => statusRender(record, onStatusChange),
      sortOrder: sortOrder(sorting, 'active'),
      sorter: true,
      width: 140,
    },
  ];

  return columns;
};
