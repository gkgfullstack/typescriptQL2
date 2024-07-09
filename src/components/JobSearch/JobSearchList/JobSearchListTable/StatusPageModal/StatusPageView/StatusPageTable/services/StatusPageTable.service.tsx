import React from 'react';
import { Sorting } from 'src/types/Sorting';
import { ColumnProps, SortOrder } from 'antd/lib/table';
import ConfigureJobStatusTableInfo from 'src/types/ConfigureJobStatusTableInfo';
import moment from 'moment';

interface ColumnConfig extends ColumnProps<any> {
  customColRenderer?: (dataIndex: ConfigureJobStatusTableInfo) => React.ReactNode;
}

const sortOrder = (
  sortedInfo: Sorting<ConfigureJobStatusTableInfo> | null,
  key: keyof ConfigureJobStatusTableInfo
): SortOrder | boolean => {
  return sortedInfo && sortedInfo.field === key ? sortedInfo.order : false;
};

const checkRecordValue = (value: string) => {
  return <span>{value ? value : '-'}</span>;
};

const renderTimeField = (value: string) => {
  return <span>{value ? moment(value).format('MM-DD-YY HH:mm') : '-'}</span>;
};

export const getColumns = (sorting: any, permissions: { [key: string]: boolean }) => {
  const columns: ColumnConfig[] = [
    {
      title: 'Work Unit',
      key: 'id',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => checkRecordValue(record.workUnitId),
      sortOrder: sortOrder(sorting, 'id'),
      sorter: true,
      width: 70,
    },
    {
      title: 'Script',
      key: 'script',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => checkRecordValue(record.script),
      sortOrder: sortOrder(sorting, 'script'),
      sorter: true,
      width: 200,
    },
    {
      title: 'Status',
      key: 'status',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => checkRecordValue(record.status),
      sortOrder: sortOrder(sorting, 'status'),
      sorter: true,
      width: 120,
    },
    {
      title: 'Priority',
      key: 'priority',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => checkRecordValue(record.priority),
      sortOrder: sortOrder(sorting, 'priority'),
      sorter: true,
      width: 120,
    },
    {
      title: 'Started',
      key: 'started',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => renderTimeField(record.started),
      sortOrder: sortOrder(sorting, 'started'),
      sorter: true,
      width: 120,
    },
    {
      title: 'Completed',
      key: 'completed',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => renderTimeField(record.completed),
      sortOrder: sortOrder(sorting, 'completed'),
      sorter: true,
      width: 120,
    },
    {
      title: 'Duration',
      key: 'duration',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => checkRecordValue(record.duration),
      sortOrder: sortOrder(sorting, 'duration'),
      sorter: true,
      width: 120,
    },
  ];

  const fileColumn: ColumnConfig = {
    title: 'Files',
    key: 'files',
    defaultSortOrder: 'ascend',
    sortDirections: ['ascend', 'descend', 'ascend'],
    render: record => checkRecordValue(record.files),
    sortOrder: sortOrder(sorting, 'files'),
    sorter: true,
    width: 120,
  };

  if (permissions && permissions.isAdminMode && permissions.isAppAdmin) {
    columns.push(fileColumn);
  }

  return columns;
};
