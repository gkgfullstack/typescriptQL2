import { Sorting } from 'src/types/Sorting';
import { ColumnProps, SortOrder } from 'antd/lib/table';
import SpiderCategoryTableInfo from 'src/types/SpiderCategoryTableInfo';
import React from 'react';

interface ColumnConfig extends ColumnProps<SpiderCategoryTableInfo> {
  customColRenderer?: (dataIndex: SpiderCategoryTableInfo) => React.ReactNode;
}

export const sortOrder = (
  sortedInfo: Sorting<SpiderCategoryTableInfo> | null,
  key: keyof SpiderCategoryTableInfo
): SortOrder | boolean => {
  return sortedInfo && sortedInfo.field === key ? sortedInfo.order : false;
};

export const getColumns = (sorting: any) => {
  const columns: ColumnConfig[] = [
    {
      title: 'Status',
      key: 'type',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => <span>{record.type}</span>,
      sortOrder: sortOrder(sorting, 'type'),
      sorter: true,
      width: 70,
    },
    {
      title: 'Category ID',
      key: 'ID',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => <span>{record.ID}</span>,
      sortOrder: sortOrder(sorting, 'ID'),
      sorter: true,
      width: 200,
    },
    {
      title: 'Category Name',
      key: 'name',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => <span>{record.name}</span>,
      sortOrder: sortOrder(sorting, 'name'),
      sorter: true,
      width: 120,
    },
    {
      title: 'Full Path',
      key: 'full_Path',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => <span>{record.full_Path}</span>,
      sortOrder: sortOrder(sorting, 'full_Path'),
      sorter: true,
      width: 120,
    },
    {
      title: 'Num Jobs',
      key: 'jobs',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => <span>{record.jobs}</span>,
      sortOrder: sortOrder(sorting, 'jobs'),
      sorter: true,
      width: 120,
    },
  ];

  return columns;
};
