import { Sorting } from 'src/types/Sorting';
import { ColumnProps, SortOrder } from 'antd/lib/table';
import React from 'react';
import ConfigureClientTableInfo from 'src/types/ConfigureClientTableInfo';
import { Link } from 'react-router-dom';
import routes from 'src/routes';

interface ColumnConfig extends ColumnProps<any> {
  customColRenderer?: (dataIndex: ConfigureClientTableInfo) => React.ReactNode;
}

const sortOrder = (
  sortedInfo: Sorting<ConfigureClientTableInfo> | null,
  key: keyof ConfigureClientTableInfo
): SortOrder | boolean => {
  return sortedInfo && sortedInfo.field === key ? sortedInfo.order : false;
};

export const clientNameRender = (record: any) => {
  return (
    <Link
      to={`${routes.configureClient}?clientId=${record.ID}&name=${record.name}&status=${record.active}&schema=${record.mwsSchema}`}
    >
      {record.name}
    </Link>
  );
};

export const getColumns = (sorting: any) => {
  const columns: ColumnConfig[] = [
    {
      title: 'Client ID',
      key: 'ID',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => <span>{record.ID}</span>,
      sortOrder: sortOrder(sorting, 'ID'),
      sorter: true,
      width: 70,
    },
    {
      title: 'Client Name',
      key: 'name',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => clientNameRender(record),
      sortOrder: sortOrder(sorting, 'name'),
      sorter: true,
      width: 200,
    },
    {
      title: 'Industry',
      key: 'industry',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => <span>{record.industry}</span>,
      sortOrder: sortOrder(sorting, 'industry'),
      sorter: true,
      width: 120,
    },
    {
      title: 'Vertical',
      key: 'mwsSchema',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => <span>{record.mwsSchema}</span>,
      sortOrder: sortOrder(sorting, 'mwsSchema'),
      sorter: true,
      width: 120,
    },
  ];

  return columns;
};
