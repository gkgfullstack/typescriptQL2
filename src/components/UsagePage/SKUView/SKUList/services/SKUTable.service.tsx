import { Sorting } from 'src/types/Sorting';
import { ColumnProps, SortOrder } from 'antd/lib/table';
import React from 'react';
import SKUInfo from 'src/types/SKU_Info';
import styles from '../SKUList.module.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOff, faToggleOn } from '@fortawesome/pro-light-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface ColumnConfig extends ColumnProps<SKUInfo> {
  customColRenderer?: (dataIndex: SKUInfo) => React.ReactNode;
}

const faToggleOffIcon = faToggleOff as IconProp;
const faToggleOnIcon = faToggleOn as IconProp;

export const sortOrder = (sortedInfo: Sorting<SKUInfo> | null, key: keyof SKUInfo): SortOrder | boolean => {
  return sortedInfo && sortedInfo.field === key ? sortedInfo.order : false;
};

export const statusRender = (status: boolean) => {
  return (
    <>
      {status ? (
        <FontAwesomeIcon icon={faToggleOnIcon} className={styles.status_active_icon} size="lg" />
      ) : (
        <FontAwesomeIcon icon={faToggleOffIcon} className={styles.status_inactive_icon} size="lg" />
      )}
    </>
  );
};

export const getColumns = (sorting: any) => {
  const columns: ColumnConfig[] = [
    {
      title: 'Product Name',
      key: 'productName',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => <span>{record.productName}</span>,
      sortOrder: sortOrder(sorting, 'productName'),
      sorter: true,
      width: 70,
    },
    {
      title: 'Unique ID',
      key: 'productSku',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => <span>{record.productSku}</span>,
      sortOrder: sortOrder(sorting, 'productSku'),
      sorter: true,
      width: 200,
    },
    {
      title: 'Insert Timestamp',
      key: 'inserted',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => <span>{record.inserted}</span>,
      sortOrder: sortOrder(sorting, 'inserted'),
      sorter: true,
      width: 120,
    },
    {
      title: 'Update Timestamp',
      key: 'updated',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => <span>{record.updated}</span>,
      sortOrder: sortOrder(sorting, 'updated'),
      sorter: true,
      width: 120,
    },
    {
      title: 'Update By',
      key: 'updatedBy',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => <span>{record.updatedBy}</span>,
      sortOrder: sortOrder(sorting, 'updatedBy'),
      sorter: true,
      width: 120,
    },
    {
      title: 'Current Status',
      key: 'status',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => statusRender(record.status),
      sortOrder: sortOrder(sorting, 'status'),
      sorter: true,
      width: 120,
    },
  ];

  return columns;
};
