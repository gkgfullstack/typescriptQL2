import React, { useState } from 'react';
import { Table } from 'antd';
import { SorterResult, PaginationConfig } from 'antd/lib/table';
import { Sorting } from 'src/types/Sorting';
import AuditHistoryInfo from 'src/types/AuditHistoryInfo';
import { defaultColumns } from '../hooks/useAuditHistoryListTableColumns';
import { useAuditHistoryListTableColumns } from '../hooks';
import Spin from 'src/components/common/Spin';
import styles from './AuditHistoryListTable.module.less';

export type AuditHistoryListTableProps = {
  items: AuditHistoryInfo[];
  sorting: Sorting<AuditHistoryInfo>;
  onSortingChange: (sorting: Sorting<AuditHistoryInfo>) => void;
  onPageSizeChange: (size: number) => void;
  onPageChange: (page: number) => void;
  isAuditTableDisabled: string;
  pageSize: number;
  total: number;
  loading?: boolean;
  page?: number;
};

const AuditHistoryListTable: React.FC<AuditHistoryListTableProps> = ({
  items,
  sorting,
  pageSize,
  total,
  loading,
  page,
  onSortingChange,
  onPageChange,
  onPageSizeChange,
  isAuditTableDisabled,
}: AuditHistoryListTableProps): React.ReactElement => {
  // eslint-disable-next-line @typescript-eslint/camelcase
  const locale = { items_per_page: '' };
  const [selectedColumns, setSelectedColumns] = useState<any[]>(defaultColumns);
  const onColumnChange = (value: string) => {
    const selectedValues = value.split(',');
    setSelectedColumns(selectedValues);
  };
  const [columns] = useAuditHistoryListTableColumns(sorting, selectedColumns, onColumnChange);
  const handlePageSizeChanges = (_: number, size: number): void => {
    onPageSizeChange(size);
  };
  const handlerSortingColumn = (
    _: PaginationConfig,
    __: Partial<Record<keyof AuditHistoryInfo, string[]>>,
    sorter: SorterResult<AuditHistoryInfo>
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
  const totalRender = (): React.ReactNode => <span>Total Results: {total}</span>;

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
  const emptyText: React.ReactNode = (): React.ReactNode => {
    if (isAuditTableDisabled) {
      return <p className={styles.no_selection}>{`Select ${isAuditTableDisabled} to display search results`}</p>;
    }
    return <p className={styles.no_results}>No results found</p>;
  };

  return (
    <div className={`${styles.audit_history_table} table_list_container`}>
      <Spin spinning={loading}>
        <Table
          rowClassName={(): string => 'table_table_row'}
          rowKey={(_, index: number): string => index.toString()}
          columns={columns}
          pagination={pagination}
          dataSource={items}
          onChange={handlerSortingColumn}
          tableLayout={'auto'}
          locale={{ emptyText: emptyText }}
        />
      </Spin>
    </div>
  );
};

export default AuditHistoryListTable;
