import { ColumnProps } from 'antd/lib/table';
import React from 'react';
import MetadataInfo from 'src/types/MetadataInfo';

interface ColumnConfig extends ColumnProps<any> {
  customColRenderer?: (dataIndex: MetadataInfo) => React.ReactNode;
}

const renderMetadata = (record: any) => {
  const metadataList =
    record.metadata && record.metadata.length > 0
      ? record.metadata.reduce((res: any, item: any, i: number) => {
          return i === 0 ? item.name : `${res}, ${item.name}`;
        }, '')
      : '';
  return <span>{metadataList}</span>;
};

export const getColumns = () => {
  const columns: ColumnConfig[] = [
    {
      title: 'Name',
      key: 'name',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => <span>{record.name}</span>,
      width: 70,
    },
    {
      title: 'Metadata',
      key: 'metadata',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => renderMetadata(record),
      width: 70,
    },
  ];

  return columns;
};
