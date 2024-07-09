import React from 'react';
import { Table } from 'antd';
import { SorterResult, PaginationConfig } from 'antd/lib/table';
import { Sorting } from 'src/types/Sorting';
import RTLPreviewType from 'src/types/RTLPreviewType';
import { usePreviewRTableColumns } from '../hooks';
import Spin from 'src/components/common/Spin';
import styles from '../PreviewRTableList.module.less';

export type PreviewRListTableProps = {
  items: RTLPreviewType[];
  columns:string;
  sorting: Sorting<RTLPreviewType>;
  onSortingChange: (sorting: Sorting<RTLPreviewType>) => void;
  onPageSizeChange: (size: number) => void;
  onPageChange: (page: number) => void;
  total: number;
  pageSize: number;
  loading?: boolean;
  page?: number;
  columnsg:string
};

const PreviewRListTable: React.FC<PreviewRListTableProps> = ({
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
}: PreviewRListTableProps): React.ReactElement => {
  const locale = { items_per_page: '' };
  const [columnss] = usePreviewRTableColumns(sorting, columnsg);
  const handlePageSizeChanges = (_: number, size: number): void => {
    onPageSizeChange(size);
  };
  const handlerSortingColumn = (
    _: PaginationConfig,
    __: Partial<Record<keyof RTLPreviewType, string[]>>,
    sorter: SorterResult<RTLPreviewType>
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
          rowKey={(_, index: number): string => index.toString()}
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

export default PreviewRListTable;
