import { Sorting } from 'src/types/Sorting';
import { ColumnProps, SortOrder } from 'antd/lib/table';
import { SearchSummary } from 'src/types/SearchSummary';
import React from 'react';

interface ColumnConfig extends ColumnProps<SearchSummary> {
  customColRenderer?: (dataIndex: SearchSummary) => React.ReactNode;
}

export const sortOrder = (sortedInfo: Sorting<SearchSummary> | null, key: keyof SearchSummary): SortOrder | boolean => {
  return sortedInfo && sortedInfo.field === key ? sortedInfo.order : false;
};

export const getColumns = (sorting: any, isInputVisible: boolean) => {
  const columns: ColumnConfig[] = [
    {
      title: 'Vertical',
      key: 'appName',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => <span>{record.appName}</span>,
      sortOrder: sortOrder(sorting, 'appName'),
      sorter: true,
      width: 70,
    },
    {
      title: 'Job Name',
      key: 'searchName',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => <span>{record.searchName}</span>,
      sortOrder: sortOrder(sorting, 'searchName'),
      sorter: true,
      width: 70,
    },
  ];

  if (isInputVisible) {
    columns.push(
      {
        title: '% Total Inputs',
        key: 'totalResultPercent',
        defaultSortOrder: 'ascend',
        sortDirections: ['ascend', 'descend', 'ascend'],
        render: record => <span>{record.totalResultPercent ? record.totalResultPercent : '0%'}</span>,
        sortOrder: sortOrder(sorting, 'totalResultPercent'),
        sorter: true,
        width: 200,
      },
      {
        title: 'Total Inputs',
        key: 'totalResult',
        defaultSortOrder: 'ascend',
        sortDirections: ['ascend', 'descend', 'ascend'],
        render: record => <span>{record.totalResult ? record.totalResult : '0'}</span>,
        sortOrder: sortOrder(sorting, 'totalResult'),
        sorter: true,
        width: 120,
      },
      {
        title: '% Total Executed Inputs',
        key: 'totalExecResultPercent',
        defaultSortOrder: 'ascend',
        sortDirections: ['ascend', 'descend', 'ascend'],
        render: record => <span>{record.totalExecResultPercent ? record.totalExecResultPercent : '0%'}</span>,
        sortOrder: sortOrder(sorting, 'totalExecResultPercent'),
        sorter: true,
        width: 120,
      },
      {
        title: 'Total Executed Inputs',
        key: 'totalExecResult',
        defaultSortOrder: 'ascend',
        sortDirections: ['ascend', 'descend', 'ascend'],
        render: record => <span>{record.totalExecResult ? record.totalExecResult : '0'}</span>,
        sortOrder: sortOrder(sorting, 'totalExecResult'),
        sorter: true,
        width: 120,
      }
    );
  } else {
    columns.push(
      {
        title: '% Total Outputs',
        key: 'totalOutputPercent',
        defaultSortOrder: 'ascend',
        sortDirections: ['ascend', 'descend', 'ascend'],
        render: record => <span>{record.totalOutputPercent ? record.totalOutputPercent : '0%'}</span>,
        sortOrder: sortOrder(sorting, 'totalResultPercent'),
        sorter: true,
        width: 200,
      },
      {
        title: 'Total Outputs',
        key: 'totalOutput',
        defaultSortOrder: 'ascend',
        sortDirections: ['ascend', 'descend', 'ascend'],
        render: record => <span>{record.totalOutput ? record.totalOutput : '0'}</span>,
        sortOrder: sortOrder(sorting, 'totalResult'),
        sorter: true,
        width: 120,
      }
    );
  }

  return columns;
};
