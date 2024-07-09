import { Sorting } from 'src/types/Sorting';
import { ColumnProps, SortOrder } from 'antd/lib/table';
import React from 'react';
import MatchAttributeDetails from 'src/types/matchAttributeDetails';
import moment from 'moment';
import TableColumnsFilter from 'src/components/common/TableColumnsFilter';

interface ColumnConfig extends ColumnProps<any> {
  customColRenderer?: (dataIndex: MatchAttributeDetails) => React.ReactNode;
}

const sortOrder = (
  sortedInfo: Sorting<MatchAttributeDetails> | null,
  key: keyof MatchAttributeDetails
): SortOrder | boolean => {
  return sortedInfo && sortedInfo.field === key ? sortedInfo.order : false;
};

export const renderDate = (date: number) => {
  return date ? moment(date).format('MM-DD-YYYY hh:mm') : '';
};

export const defaultColumns = [
  'ownerName',
  'ownerId',
  'matchAttributeLocation',
  'rawAttributeName',
  'regexParse',
  'normalizationsAfterRegexParse',
  'normalizationsBeforeRegexParse',
  'actions',
];

export const columnNames: any = {
  matchAttributeName: 'Match Attribute Name',
  ownerName: 'Owner Name',
  ownerId: 'Owner Id',
  matchAttributeMapId: 'Match Attribute Map Id',
  rawAttributeName: 'Raw Attribute Name',
  matchAttributeLocation: 'Match Attribute Location',
  regexParse: 'Regex Parse',
  insertTimestamp: 'Insert Timestamp',
  updateTimestamp: 'Update Timestamp',
  normalizationsAfterRegexParse: 'Normalizations After Regex Parse',
  normalizationsBeforeRegexParse: 'Normalizations Before Regex Parse',
  defaultValue: 'Default Value',
  locationPriority: 'Location Priority',
  defaultMeasurementUnit: 'Default Measurement Unit',
};

export const columnOptions: any = [
  {
    name: 'Match Attribute Name',
    id: 'matchAttributeName',
  },
  {
    name: 'Owner Name',
    id: 'ownerName',
  },
  {
    name: 'Owner Id',
    id: 'ownerId',
  },
  {
    name: 'Match Attribute Map Id',
    id: 'matchAttributeMapId',
  },
  {
    name: 'Raw Attribute Name',
    id: 'rawAttributeName',
  },
  {
    name: 'Match Attribute Location',
    id: 'matchAttributeLocation',
  },
  {
    name: 'Regex Parse',
    id: 'regexParse',
  },
  {
    name: 'Insert Timestamp',
    id: 'insertTimestamp',
  },
  {
    name: 'Update Timestamp',
    id: 'updateTimestamp',
  },
  {
    name: 'Normalizations After Regex Parse',
    id: 'normalizationsAfterRegexParse',
  },
  {
    name: 'Normalizations Before Regex Parse',
    id: 'normalizationsBeforeRegexParse',
  },
  {
    name: 'Default Value',
    id: 'defaultValue',
  },
  {
    name: 'Location Priority',
    id: 'locationPriority',
  },
  {
    name: 'Default Measurement Unit',
    id: 'defaultMeasurementUnit',
  },
  {
    name: 'Actions',
    id: 'actions',
  },
];

export const getColumns = (sorting: any, selectedColumns: any, onColumnChange: any) => {
  const actionsTitle = (
    <>
      {' '}
      <TableColumnsFilter onChange={onColumnChange} defaultColumns={defaultColumns} columnOptions={columnOptions} />
    </>
  );

  const columns: ColumnConfig[] = selectedColumns
    .filter((item: string) => item !== 'actions')
    .map((item: string) => {
      const sortingKey: any = item;
      return {
        title: columnNames[item],
        key: item,
        defaultSortOrder: 'ascend',
        sortDirections: ['ascend', 'descend', 'ascend'],
        render: (record: any) => {
          if (item === 'insertTimestamp' || item === 'updateTimestamp') {
            return renderDate(record[item]);
          }
          return <span>{record[item]}</span>;
        },
        sortOrder: sortOrder(sorting, sortingKey),
        className: item !== 'siteName' && item !== 'name' ? 'center' : '',
        sorter: true,
        width: 120,
      };
    });

  columns.push({
    title: actionsTitle,
    key: 'actions',
    render: () => <span>{''}</span>,
    width: 120,
  });

  return columns;
};
