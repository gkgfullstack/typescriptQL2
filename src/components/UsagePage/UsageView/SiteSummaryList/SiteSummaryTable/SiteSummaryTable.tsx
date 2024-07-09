import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { SorterResult, PaginationConfig } from 'antd/lib/table';
import { Sorting } from 'src/types/Sorting';
import { SiteUsageSummary } from 'src/types/SiteUsageSummary';
import styles from './SiteSummaryTable.module.less';
import { getColumns } from '../services/SiteSummaryTable.service';
import Spin from 'src/components/common/Spin';

export type SiteSummaryTableProps = {
  items: SiteUsageSummary[];
  sorting: Sorting<SiteUsageSummary>;
  onSortingChange: (sorting: Sorting<SiteUsageSummary>) => void;
  onDisable: () => boolean;
  onPageSizeChange: (size: number) => void;
  onPageChange: (page: number) => void;
  pageSize: number;
  total: number;
  loading?: boolean;
  page?: number;
  isInputVisible: boolean;
};

const SiteSummaryTable: React.FC<SiteSummaryTableProps> = ({
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
}: SiteSummaryTableProps): React.ReactElement => {
  const locale = { items_per_page: '' };
  const [columns, setColumns] = useState<any[]>([]);
  const totalRender = (): React.ReactNode => <span>Total Results: {total}</span>;
  const emptyText: React.ReactNode = (): React.ReactNode => {
    if (!onDisable()) {
      return (
        <p className={styles.no_results}>Select Application, User, Site, Job, Date Range and Timezone to refine your results</p>
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
    __: Partial<Record<keyof SiteUsageSummary, string[]>>,
    sorter: SorterResult<SiteUsageSummary>
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
    <div className={styles.site_list_table_wrapper}>
      <Spin spinning={loading}>
        <Table
          rowClassName={(): string => styles.site_list_table_row}
          className={styles.site_list_table}
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

export default SiteSummaryTable;
