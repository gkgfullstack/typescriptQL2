import React, { useEffect, useState } from 'react';
import { ColumnProps, SortOrder } from 'antd/lib/table';
import { Sorting } from 'src/types/Sorting';
import AuditHistoryInfo from 'src/types/AuditHistoryInfo';
import styles from '../AuditHistoryList.module.less';
import { Link } from 'react-router-dom';
import TableColumnsFilter from '../../../common/TableColumnsFilter';
import moment from 'moment';

interface ColumnConfig extends ColumnProps<AuditHistoryInfo> {
  customColRenderer?: (dataIndex: AuditHistoryInfo) => React.ReactNode;
}
const sortOrder = (sortedInfo: Sorting<AuditHistoryInfo> | null, key: keyof AuditHistoryInfo): SortOrder | boolean => {
  return sortedInfo && sortedInfo.field === key ? sortedInfo.order : false;
};
const createdRenders = (text: { SrcProductName: string; SrcProductId: string }) => {
  const srcproductName = `${text.SrcProductName}`;
  if (srcproductName === null || srcproductName === '') {
    return 'n/a';
  } else {
    return (
      <Link
        to={`/optiprice/product-details/${text.SrcProductId}`}
        title={text.SrcProductName}
        referrerPolicy={'origin'}
      >
        {text.SrcProductName}
      </Link>
    );
  }
};

const competitorProductName = (text: { CompetitorProductName: string }) => {
  const competitorProduct = `${text.CompetitorProductName}`;
  if (competitorProduct === null || competitorProduct === '') {
    return 'n/a';
  } else {
    return `${text.CompetitorProductName}`;
  }
};

const renderTimeField = (value: string) => {
  return value ? <span>{moment(value).format('YYYY-MM-DD HH:mm:ss')}</span> : '';
};

export const defaultColumns = [
  'RequestType',
  'Status',
  'SrcProductName',
  'CompetitorProductName',
  'CompetitorSite',
  'Reporter',
  'Reason',
  'actions',
];

const columnNames: any = {
  RequestType: 'Request Type',
  Status: 'Status',
  SrcProductName: 'Source Product',
  CompetitorProductName: 'Competitor Product',
  CompetitorSite: 'Competitor Site',
  Reporter: 'Reporter',
  Reason: 'Reason',
  InsertTimestamp: 'Insert Time',
  RequestCompletedTimestamp: 'Request Completed Timestamp',
  MatchType: 'Match Type',
};

const columnOptions = Object.keys(columnNames).map((id: string) => {
  const requiredColumns = ['RequestType', 'Status', 'SrcProductName'];
  return {
    name: columnNames[id],
    id: id,
    disabled: requiredColumns.indexOf(id) > -1,
  };
});

export const getColumns = (
  sorting: Sorting<AuditHistoryInfo>,
  selectedColumns: any,
  onColumnChange: any
): ColumnConfig[] => {
  const actionsTitle = (
    <TableColumnsFilter onChange={onColumnChange} defaultColumns={defaultColumns} columnOptions={columnOptions} />
  );
  const columns: ColumnConfig[] = selectedColumns
    .filter((item: string) => item !== 'actions')
    .map((item: string) => {
      const sortingKey: any = item;
      return {
        title: columnNames[item],
        className: item === 'Status' ? styles.status_column : '',
        render: (record: any) => {
          if (item === 'CompetitorProductName') {
            return competitorProductName(record);
          }
          if (item === 'SrcProductName') {
            return createdRenders(record);
          }
          if (item === 'InsertTimestamp' || item === 'RequestCompletedTimestamp') {
            return renderTimeField(record[item]);
          }
          return <span>{record[item]}</span>;
        },
        key: item,
        defaultSortOrder: 'ascend',
        sortDirections: ['ascend', 'descend', 'ascend'],
        sortOrder: sortOrder(sorting, sortingKey),
        sorter: true,
        width: 135,
      };
    });

  columns.push({
    title: actionsTitle,
    key: 'actions',
    dataIndex: 'actions',
    width: 5,
  });

  return columns;
};

const useAuditHistoryListTableColumns = (
  sorting: Sorting<AuditHistoryInfo>,
  selectedColumns: any,
  onColumnChange: any
): [ColumnConfig[]] => {
  const [columns, setColumns] = useState<ColumnConfig[]>([]);

  useEffect(() => {
    if (sorting) {
      setColumns(getColumns(sorting, selectedColumns, onColumnChange));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting, selectedColumns]);
  return [columns];
};

export default useAuditHistoryListTableColumns;
