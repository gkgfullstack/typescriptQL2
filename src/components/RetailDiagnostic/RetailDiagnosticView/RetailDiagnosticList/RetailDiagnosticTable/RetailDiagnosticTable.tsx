import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { SorterResult, PaginationConfig } from 'antd/lib/table';
import { Sorting } from 'src/types/Sorting';
import RetailDiagnosticInfo from 'src/types/RetailDiagnosticInfo';
import styles from './RetailDiagnosticTable.module.less';
import { defaultColumns, getColumns } from '../services/RetailDiagnosticTable.service';

export type RetailDiagnosticTableProps = {
  items: RetailDiagnosticInfo[];
  sorting: Sorting<RetailDiagnosticInfo>;
  onSortingChange: (sorting: Sorting<RetailDiagnosticInfo>) => void;
  onPageSizeChange: (size: number) => void;
  onPageChange: (page: number) => void;
  pageSize: number;
  total: number;
  page?: number;
  onAction?: (record: any, type: string) => void;
  onRefresh?: any;
  rowSelection: any;
};

const RetailDiagnosticTable: React.FC<RetailDiagnosticTableProps> = ({
  items,
  sorting,
  pageSize,
  total,
  page,
  onSortingChange,
  onPageChange,
  onPageSizeChange,
  onAction,
  onRefresh,
  rowSelection,
}: RetailDiagnosticTableProps): React.ReactElement => {
  const locale = { items_per_page: '' };
  const [selectedColumns, setSelectedColumns] = useState<any[]>(defaultColumns);
  const [columns, setColumns] = useState<any[]>([]);
  const totalRender = (): React.ReactNode => <span>Total Results: {total}</span>;
  const emptyText: React.ReactNode = (): React.ReactNode => {
    return <p className={styles.no_results}>No results found</p>;
  };
  const onColumnChange = (value: string) => {
    const selectedValues = value.split(',');
    setSelectedColumns(selectedValues);
  };

  useEffect(() => {
    if (sorting && selectedColumns) {
      setColumns(getColumns(sorting, selectedColumns, onAction, onColumnChange, onRefresh));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting, selectedColumns]);

  const handlePageSizeChanges = (_: number, size: number): void => {
    onPageSizeChange(size);
  };

  const handlerSortingColumn = (
    _: PaginationConfig,
    __: Partial<Record<keyof RetailDiagnosticInfo, string[]>>,
    sorter: SorterResult<RetailDiagnosticInfo>
  ): void => {
    const order =
      sorting.field === sorter.columnKey && sorter.order === undefined
        ? sorting.order === 'ascend'
          ? 'descend'
          : 'ascend'
        : sorter.order;

    onSortingChange({ field: sorter.columnKey, order: order });
  };

  const handlerPageChange = (page: number): void => {
    onPageChange(page);
  };

  const pagination: PaginationConfig = {
    pageSize: pageSize,
    current: page,
    showTotal: totalRender,
    total: total,
    hideOnSinglePage: false,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50'],
    locale: locale,
    onShowSizeChange: handlePageSizeChanges,
    onChange: handlerPageChange,
  };

  return (
    <div>
      <Table
        rowClassName={(record: any): string => {
          return record.status !== 'RUNNING' ? styles.diagnostic_list_table_row : styles.diagnostic_actions_disabled;
        }}
        className={styles.diagnostic_list_table}
        rowKey={(_, index: number): string => index.toString()}
        columns={columns}
        pagination={pagination}
        dataSource={items}
        onChange={handlerSortingColumn}
        tableLayout={'auto'}
        locale={{ emptyText: emptyText }}
        rowSelection={rowSelection}
      />
    </div>
  );
};

export default RetailDiagnosticTable;
