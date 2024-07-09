import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { SorterResult, PaginationConfig } from 'antd/lib/table';
import { Sorting } from 'src/types/Sorting';
import styles from './CompetitiveSetsTable.module.less';
import { getColumns } from 'src/components/SettingsPage/CompetitiveSets/CompetitiveSetsView/CompetitiveSetsList/services/CompetitiveSetsTable.service';
import Spin from 'src/components/common/Spin';
import { CompetitiveSetInfo } from 'src/types/CompetitiveSetInfo';

export type CompetitiveSetsTableProps = {
  items: CompetitiveSetInfo[];
  sorting: Sorting<CompetitiveSetInfo>;
  onSortingChange: (sorting: Sorting<CompetitiveSetInfo>) => void;
  onPageSizeChange: (size: number) => void;
  onPageChange: (page: number) => void;
  pageSize: number;
  total: number;
  loading?: boolean;
  page?: number;
  onAction?: (record: any, type: string) => void;
};

const CompetitiveSetsTable: React.FC<CompetitiveSetsTableProps> = ({
  items,
  sorting,
  pageSize,
  total,
  loading,
  page,
  onSortingChange,
  onPageChange,
  onPageSizeChange,
  onAction,
}: CompetitiveSetsTableProps): React.ReactElement => {
  const locale = { items_per_page: '' };
  const [columns, setColumns] = useState<any[]>([]);
  const totalRender = (): React.ReactNode => <span>Total Results: {total}</span>;
  const emptyText: React.ReactNode = (): React.ReactNode => {
    return <p className={styles.no_results}>No results found</p>;
  };

  useEffect(() => {
    if (sorting) {
      setColumns(getColumns(sorting, onAction));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting]);

  const handlePageSizeChanges = (_: number, size: number): void => {
    onPageSizeChange(size);
  };

  const handlerSortingColumn = (
    _: PaginationConfig,
    __: Partial<Record<keyof CompetitiveSetInfo, string[]>>,
    sorter: SorterResult<CompetitiveSetInfo>
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
    <div className={styles.competitive_sets_table_wrapper}>
      <Spin spinning={loading}>
        <Table
          rowClassName={(): string => styles.competitive_sets_table_row}
          className={styles.competitive_sets_table}
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

export default CompetitiveSetsTable;
