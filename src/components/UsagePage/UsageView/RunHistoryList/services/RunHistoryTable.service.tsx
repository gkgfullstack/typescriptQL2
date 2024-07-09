import { Sorting } from 'src/types/Sorting';
import { ColumnProps, SortOrder } from 'antd/lib/table';
import { RunHistory } from 'src/types/RunHistory';
import React from 'react';

interface ColumnConfig extends ColumnProps<RunHistory> {
  customColRenderer?: (dataIndex: RunHistory) => React.ReactNode;
}

export const sortOrder = (sortedInfo: Sorting<RunHistory> | null, key: keyof RunHistory): SortOrder | boolean => {
  return sortedInfo && sortedInfo.field === key ? sortedInfo.order : false;
};

const getFilterColumn = (sorting: any, isInputVisible: boolean): ColumnConfig[] => {
  if (isInputVisible) {
    return [
      {
        title: 'Total Inputs',
        key: 'total',
        defaultSortOrder: 'ascend',
        sortDirections: ['ascend', 'descend', 'ascend'],
        render: record => <span>{record.total}</span>,
        sortOrder: sortOrder(sorting, 'total'),
        sorter: true,
        width: 120,
      },
      {
        title: 'Total Executed Inputs',
        key: 'exceuted',
        defaultSortOrder: 'ascend',
        sortDirections: ['ascend', 'descend', 'ascend'],
        render: record => <span>{record.exceuted}</span>,
        sortOrder: sortOrder(sorting, 'exceuted'),
        sorter: true,
        width: 120,
      },
    ];
  } else {
    return [
      {
        title: 'Total Outputs',
        key: 'total',
        defaultSortOrder: 'ascend',
        sortDirections: ['ascend', 'descend', 'ascend'],
        render: record => <span>{record.total}</span>,
        sortOrder: sortOrder(sorting, 'total'),
        sorter: true,
        width: 120,
      },
    ];
  }
};

const getPeriodColumn = (sorting: any, period: string): ColumnConfig => {
  const title = period.charAt(0).toUpperCase() + period.slice(1);

  return {
    title: title,
    key: 'timePeriod',
    defaultSortOrder: 'ascend',
    sortDirections: ['ascend', 'descend', 'ascend'],
    render: record => <span>{record.timePeriod}</span>,
    sortOrder: sortOrder(sorting, 'timePeriod'),
    sorter: true,
    width: 70,
  };
};

export const getColumns = (sorting: any, period: string, isInputVisible: boolean) => {
  const columns: ColumnConfig[] = getFilterColumn(sorting, isInputVisible);
  columns.unshift(getPeriodColumn(sorting, period));

  return columns;
};
