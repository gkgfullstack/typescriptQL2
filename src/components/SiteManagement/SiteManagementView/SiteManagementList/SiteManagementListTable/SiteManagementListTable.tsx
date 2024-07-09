import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { SorterResult, PaginationConfig } from 'antd/lib/table';
import { Sorting } from 'src/types/Sorting';
import { SiteManagementInfo } from 'src/types/SiteManagementInfo';
import styles from './SiteManagementListTable.module.less';
import { getColumns } from '../services/SiteManagementListTable.service';
import Spin from 'src/components/common/Spin';

export type SiteManagementListTableProps = {
  items: SiteManagementInfo[];
  sorting: Sorting<SiteManagementInfo>;
  onSortingChange: (sorting: Sorting<SiteManagementInfo>) => void;
  onPageSizeChange: (size: number) => void;
  onPageChange: (page: number) => void;
  onChangeStatus: (record: any) => void;
  pageSize: number;
  total: number;
  loading?: boolean;
  page?: number;
  disabledTable?: boolean;
  onAction?: (record: any, type: string) => void;
};

const SiteManagementListTable: React.FC<SiteManagementListTableProps> = ({
  items,
  sorting,
  pageSize,
  total,
  loading,
  page,
  onSortingChange,
  onPageChange,
  onPageSizeChange,
  onChangeStatus,
  disabledTable,
  onAction,
}: SiteManagementListTableProps): React.ReactElement => {
  const locale = { items_per_page: '' };
  const [columns, setColumns] = useState<any[]>([]);
  const totalRender = (): React.ReactNode => <span>Total Results: {total}</span>;
  const emptyText: React.ReactNode = (): React.ReactNode => {
    if (!disabledTable) {
      return <p className={styles.no_results}>No results found</p>;
    } else {
      return <p className={styles.no_results}>Select Vertical to refine your results</p>;
    }
  };

  useEffect(() => {
    if (sorting) {
      setColumns(getColumns(sorting, onChangeStatus, onAction));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting]);

  const handlePageSizeChanges = (_: number, size: number): void => {
    onPageSizeChange(size);
  };

  const handlerSortingColumn = (
    _: PaginationConfig,
    __: Partial<Record<keyof SiteManagementInfo, string[]>>,
    sorter: SorterResult<SiteManagementInfo>
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

export default SiteManagementListTable;
