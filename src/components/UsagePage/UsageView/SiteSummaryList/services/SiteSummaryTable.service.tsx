import { Sorting } from 'src/types/Sorting';
import { ColumnProps, SortOrder } from 'antd/lib/table';
import { SiteUsageSummary } from 'src/types/SiteUsageSummary';
import React from 'react';

interface ColumnConfig extends ColumnProps<SiteUsageSummary> {
  customColRenderer?: (dataIndex: SiteUsageSummary) => React.ReactNode;
}

export const sortOrder = (
  sortedInfo: Sorting<SiteUsageSummary> | null,
  key: keyof SiteUsageSummary
): SortOrder | boolean => {
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
      title: 'Site Code',
      key: 'siteCode',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => <span>{record.siteCode}</span>,
      sortOrder: sortOrder(sorting, 'siteCode'),
      sorter: true,
      width: 70,
    },
    {
      title: 'Site Name',
      key: 'siteName',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => <span>{record.siteName}</span>,
      sortOrder: sortOrder(sorting, 'siteName'),
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
        render: record => <span>{record.totalResultPercent}</span>,
        sortOrder: sortOrder(sorting, 'totalResultPercent'),
        sorter: true,
        width: 200,
      },
      {
        title: 'Total Inputs',
        key: 'totalResult',
        defaultSortOrder: 'ascend',
        sortDirections: ['ascend', 'descend', 'ascend'],
        render: record => <span>{record.totalResult}</span>,
        sortOrder: sortOrder(sorting, 'totalResult'),
        sorter: true,
        width: 120,
      },
      {
        title: '% Total Executed Inputs',
        key: 'totalExecResultPercent',
        defaultSortOrder: 'ascend',
        sortDirections: ['ascend', 'descend', 'ascend'],
        render: record => <span>{record.totalExecResultPercent}</span>,
        sortOrder: sortOrder(sorting, 'totalExecResultPercent'),
        sorter: true,
        width: 120,
      },
      {
        title: 'Total Executed Inputs',
        key: 'totalExecResult',
        defaultSortOrder: 'ascend',
        sortDirections: ['ascend', 'descend', 'ascend'],
        render: record => <span>{record.totalExecResult}</span>,
        sortOrder: sortOrder(sorting, 'totalExecResult'),
        sorter: true,
        width: 120,
      }
    );
  } else {
    columns.push(
      {
        title: '% Total Outputs',
        key: 'totalResultPercent',
        defaultSortOrder: 'ascend',
        sortDirections: ['ascend', 'descend', 'ascend'],
        render: record => <span>{record.totalResultPercent}</span>,
        sortOrder: sortOrder(sorting, 'totalResultPercent'),
        sorter: true,
        width: 200,
      },
      {
        title: 'Total Outputs',
        key: 'totalResult',
        defaultSortOrder: 'ascend',
        sortDirections: ['ascend', 'descend', 'ascend'],
        render: record => <span>{record.totalResult}</span>,
        sortOrder: sortOrder(sorting, 'totalResult'),
        sorter: true,
        width: 120,
      }
    );
  }

  return columns;
};
