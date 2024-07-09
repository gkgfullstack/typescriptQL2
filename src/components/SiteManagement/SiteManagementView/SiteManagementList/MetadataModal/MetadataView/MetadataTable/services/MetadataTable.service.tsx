import { Sorting } from 'src/types/Sorting';
import { ColumnProps, SortOrder } from 'antd/lib/table';
import React from 'react';
import MetadataInfo from 'src/types/MetadataInfo';

interface ColumnConfig extends ColumnProps<any> {
  customColRenderer?: (dataIndex: MetadataInfo) => React.ReactNode;
}

const sortOrder = (
  sortedInfo: Sorting<MetadataInfo> | null,
  key: keyof MetadataInfo
): SortOrder | boolean => {
  return sortedInfo && sortedInfo.field === key ? sortedInfo.order : false;
};

export const getColumns = (sorting: any) => {
  const columns: ColumnConfig[] = [
    {
      title: 'Metadata Label',
      key: 'label',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => <span>{record.label}</span>,
      sortOrder: sortOrder(sorting, 'label'),
      sorter: true,
      width: 70,
    },
    {
      title: 'Metadata Name',
      key: 'name',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => <span>{record.name}</span>,
      sortOrder: sortOrder(sorting, 'name'),
      sorter: true,
      width: 70,
    },
    {
      title: 'Database Table/Field',
      key: 'tableRef',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => <span>{record.tableRef}</span>,
      sortOrder: sortOrder(sorting, 'tableRef'),
      sorter: true,
      width: 100,
    },
    {
      title: 'Weight',
      key: 'weight',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => <span>{record.weight}</span>,
      sortOrder: sortOrder(sorting, 'weight'),
      sorter: true,
      width: 100,
    },
  ];

  return columns;
};
