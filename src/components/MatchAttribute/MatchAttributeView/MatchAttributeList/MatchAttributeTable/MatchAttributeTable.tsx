import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { SorterResult, PaginationConfig } from 'antd/lib/table';
import { Sorting } from 'src/types/Sorting';
import styles from './MatchAttributeTable.module.less';
import { getColumns } from '../services/MatchAttributeTable.service';
import Spin from 'src/components/common/Spin';
import MatchCategoryInfo from 'src/types/MatchCategoryInfo';

export type MatchAttributeTableProps = {
  items: MatchCategoryInfo[];
  sorting: Sorting<MatchCategoryInfo>;
  onSortingChange: (sorting: Sorting<MatchCategoryInfo>) => void;
  onPageSizeChange: (size: number) => void;
  onPageChange: (page: number) => void;
  pageSize: number;
  total: number;
  loading?: boolean;
  page?: number;
  onAction?: (record: any, type: string) => void;
};

const MatchAttributeTable: React.FC<MatchAttributeTableProps> = ({
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
}: MatchAttributeTableProps): React.ReactElement => {
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
    __: Partial<Record<keyof MatchCategoryInfo, string[]>>,
    sorter: SorterResult<MatchCategoryInfo>
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
    <div className={styles.match_category_list_table_wrapper}>
      <Spin spinning={loading}>
        <Table
          rowClassName={(): string => styles.match_category_list_table_row}
          className={styles.match_category_list_table}
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

export default MatchAttributeTable;
