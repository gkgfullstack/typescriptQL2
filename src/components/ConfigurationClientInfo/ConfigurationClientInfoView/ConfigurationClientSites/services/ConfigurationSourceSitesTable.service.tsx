import { Sorting } from 'src/types/Sorting';
import { ColumnProps, SortOrder } from 'antd/lib/table';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOff, faToggleOn } from '@fortawesome/pro-light-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { ConfigureClientSitesTableInfo } from 'src/types/ConfigureClientSitesTableInfo';
import styles from '../ConfigurationClientSites.module.less';

interface ColumnConfig extends ColumnProps<any> {
  customColRenderer?: (dataIndex: ConfigureClientSitesTableInfo) => React.ReactNode;
}

const faToggleOffIcon = faToggleOff as IconProp;
const faToggleOnIcon = faToggleOn as IconProp;

const sortOrder = (
  sortedInfo: Sorting<ConfigureClientSitesTableInfo> | null,
  key: keyof ConfigureClientSitesTableInfo
): SortOrder | boolean => {
  return sortedInfo && sortedInfo.field === key ? sortedInfo.order : false;
};

const statusRender = (record: any, onAction: any) => {
  return (
    <p>
      {record.ownerClientLookup && record.ownerClientLookup.sourceSite === 1 ? (
        <FontAwesomeIcon
          icon={faToggleOnIcon}
          onClick={onAction(record)}
          className={styles.status_source_active_icon}
          size="lg"
        />
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

const regionRender = (record: any, onAction: any) => {
  return (
    <span onClick={onAction(record)} className={styles.region_view_link}>
      View
    </span>
  );
};

const bookmarkRender = (record: any) => {
  return <span>{record.bookmarkCreated ? 'Y' : 'N'}</span>;
};

export const getColumns = (sorting: any, onStatusChange: any, onRegionView: any) => {
  const columns: ColumnConfig[] = [
    {
      title: 'Site Name',
      key: 'name',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => <span>{record.name}</span>,
      sortOrder: sortOrder(sorting, 'name'),
      sorter: true,
      width: 70,
    },
    {
      title: 'Site ID',
      key: 'ID',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => <span>{record.ID}</span>,
      sortOrder: sortOrder(sorting, 'ID'),
      sorter: true,
      width: 70,
    },
    {
      title: 'Data Source',
      key: 'dataSource',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => <span>{record.dataSource}</span>,
      sortOrder: sortOrder(sorting, 'dataSource'),
      sorter: true,
      width: 100,
    },
    {
      title: 'Product Type',
      key: 'productType',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => <span>{record.productType}</span>,
      sortOrder: sortOrder(sorting, 'productType'),
      sorter: true,
      width: 100,
    },
    {
      title: 'Bookmark Created',
      key: 'bookmarkCreated',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => bookmarkRender(record),
      sortOrder: sortOrder(sorting, 'bookmarkCreated'),
      sorter: true,
      width: 200,
    },
    {
      title: 'Regions',
      key: 'region',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => regionRender(record, onRegionView),
      sortOrder: sortOrder(sorting, 'region'),
      sorter: true,
      width: 70,
    },
    {
      title: 'Primary Source',
      key: 'sourcesite',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => statusRender(record, onStatusChange),
      sortOrder: sortOrder(sorting, 'sourcesite'),
      sorter: true,
      width: 140,
    },
  ];

  return columns;
};
