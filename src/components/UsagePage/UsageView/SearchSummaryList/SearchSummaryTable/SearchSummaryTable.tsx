import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { SorterResult, PaginationConfig } from 'antd/lib/table';
import { Sorting } from 'src/types/Sorting';
import { SearchSummary } from 'src/types/SearchSummary';
import styles from './SearchSummaryTable.module.less';
import { getColumns } from '../services/SearchSummaryTable.service';
import Spin from 'src/components/common/Spin';

export type SearchSummaryTableProps = {
  items: SearchSummary[];
  sorting: Sorting<SearchSummary>;
  onDisable: () => boolean;
  onSortingChange: (sorting: Sorting<SearchSummary>) => void;
  onPageSizeChange: (size: number) => void;
  onPageChange: (page: number) => void;
  pageSize: number;
  total: number;
  loading?: boolean;
  page?: number;
  isInputVisible: boolean;
};

const SearchSummaryTable: React.FC<SearchSummaryTableProps> = ({
  items,
  sorting,
  pageSize,
  total,
  loading,
  page,
  onDisable,
  onSortingChange,
  onPageChange,
  onPageSizeChange,
  isInputVisible,
}: SearchSummaryTableProps): React.ReactElement => {
  const locale = { items_per_page: '' };
  const [columns, setColumns] = useState<any[]>([]);
  const totalRender = (): React.ReactNode => <span>Total Results: {total}</span>;
  const emptyText: React.ReactNode = (): React.ReactNode => {
    if (!onDisable()) {
      return (
        <p className={styles.no_results}>
          Select Application, User, Site, Job, Date Range and Timezone to refine your results
        </p>
      );
    }
    return <p className={styles.no_results}>No results found</p>;
  };

  useEffect(() => {
    if (sorting) {
      setColumns(getColumns(sorting, isInputVisible));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting, isInputVisible]);

  const handlePageSizeChanges = (_: number, size: number): void => {
    onPageSizeChange(size);
  };

  const handlerSortingColumn = (
    _: PaginationConfig,
    __: Partial<Record<keyof SearchSummary, string[]>>,
    sorter: SorterResult<SearchSummary>
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
    <div className={styles.search_list_table_wrapper}>
      <Spin spinning={loading}>
        <Table
          rowClassName={(): string => styles.search_list_table_row}
          className={styles.search_list_table}
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

export default SearchSummaryTable;
