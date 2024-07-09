import { Sorting } from 'src/types/Sorting';
import { ColumnProps, SortOrder } from 'antd/lib/table';
import ShallowProductTableInfo from 'src/types/ShallowProductTableInfo';
import React from 'react';

interface ColumnConfig extends ColumnProps<ShallowProductTableInfo> {
  customColRenderer?: (dataIndex: ShallowProductTableInfo) => React.ReactNode;
}

export const sortOrder = (
  sortedInfo: Sorting<ShallowProductTableInfo> | null,
  key: keyof ShallowProductTableInfo
): SortOrder | boolean => {
  return sortedInfo && sortedInfo.field === key ? sortedInfo.order : false;
};

export const getColumns = (sorting: any) => {
  const columns: ColumnConfig[] = [
    {
      title: 'Site Name',
      key: 'siteName',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => <span>{record.siteName}</span>,
      sortOrder: sortOrder(sorting, 'siteName'),
      sorter: true,
      width: 120,
    },
    {
      title: 'Total Records',
      key: 'totalRecords',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => <span>{record.totalRecords}</span>,
      sortOrder: sortOrder(sorting, 'totalRecords'),
      sorter: true,
      width: 120,
    },
    {
      title: 'Outdated Records',
      key: 'outdatedRecords',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => <span>{record.outdatedRecords}</span>,
      sortOrder: sortOrder(sorting, 'outdatedRecords'),
      sorter: true,
      width: 120,
    },
  ];

  return columns;
};
