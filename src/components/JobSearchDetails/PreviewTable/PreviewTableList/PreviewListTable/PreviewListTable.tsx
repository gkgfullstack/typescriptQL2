import React from 'react';
import { Table } from 'antd';
import { SorterResult, PaginationConfig } from 'antd/lib/table';
import { Sorting } from 'src/types/Sorting';
import PreviewTypeVIew from 'src/types/PreviewTypeVIew';
import { usePreviewTableColumns } from '../hooks';
import Spin from 'src/components/common/Spin';
import styles from '../PreviewTableList.module.less';

export type PreviewListTableProps = {
  items: PreviewTypeVIew[];
  columns: string;
  sorting: Sorting<PreviewTypeVIew>;
  onSortingChange: (sorting: Sorting<PreviewTypeVIew>) => void;
  onPageSizeChange: (size: number) => void;
  onPageChange: (page: number) => void;
  total: number;
  pageSize: number;
  loading?: boolean;
  page?: number;
  columnsg: string;
};

const PreviewListTable: React.FC<PreviewListTableProps> = ({
  items,
  sorting,
  pageSize,
  page,
  total,
  columnsg,
  loading,
  onSortingChange,
  onPageChange,
  onPageSizeChange,
}: PreviewListTableProps): React.ReactElement => {
  const locale = { items_per_page: '' };
  const [columnss] = usePreviewTableColumns(sorting, columnsg);
  const handlePageSizeChanges = (_: number, size: number): void => {
    onPageSizeChange(size);
  };
  const handlerSortingColumn = (
    _: PaginationConfig,
    __: Partial<Record<keyof PreviewTypeVIew, string[]>>,
    sorter: SorterResult<PreviewTypeVIew>
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
  const emptyText: React.ReactNode = <p className="no_results">No results found</p>;
  return (
    <div className="table_list_container">
      <Spin spinning={loading}>
        <Table
          rowClassName={(): string => styles.product_table_row}
          rowKey={(_, index: number): string => `preview_list_table_${index.toString()}`}
          columns={columnss}
          pagination={pagination}
          dataSource={items}
          onChange={handlerSortingColumn}
          //tableLayout={'auto'}
          locale={{ emptyText: emptyText }}
          scroll={{ x: 1024, y: 768 }}
          className={styles.widthss}
        />
      </Spin>
    </div>
  );
};

export default PreviewListTable;
