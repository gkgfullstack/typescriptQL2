import React from 'react';
import { Table } from 'antd';
import { SorterResult, PaginationConfig } from 'antd/lib/table';
import { Sorting } from 'src/types/Sorting';
import RCSearchsType from 'src/types/RCSearchsType';
import { useRCSearchsListTableColumns } from '../hooks';
import Spin from 'src/components/common/Spin';
//import styles from './RCSearchsListTable.module.less';

export type RCSearchsListTableProps = {
  items: RCSearchsType[];
  sorting: Sorting<RCSearchsType>;
  onSortingChange: (sorting: Sorting<RCSearchsType>) => void;
  onPageSizeChange: (size: number) => void;
  onPageChange: (page: number) => void;
  pageSize: number;
  total: number;
  loading?: boolean;
  page?: number;
};

const RCSearchsListTable: React.FC<RCSearchsListTableProps> = ({
  items,
  sorting,
  pageSize,
  total,
  loading,
  page,
  onSortingChange,
  onPageChange,
  onPageSizeChange,
}: RCSearchsListTableProps): React.ReactElement => {
  // eslint-disable-next-line @typescript-eslint/camelcase
  const locale = { items_per_page: '' };
  const [columns] = useRCSearchsListTableColumns(sorting);
  
  const handlePageSizeChanges = (_: number, size: number): void => {
    onPageSizeChange(size);
  };

  const handlerSortingColumn = (
    _: PaginationConfig,
    __: Partial<Record<keyof RCSearchsType, string[]>>,
    sorter: SorterResult<RCSearchsType>
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
          rowClassName={(): string => "table_table_row"}
          rowKey={(_, index: number): string => index.toString()}
          columns={columns}
          pagination={pagination}
          dataSource={items}
          onChange={handlerSortingColumn}
          tableLayout={'auto'}
          locale={{ emptyText: emptyText }} 
          scroll={{ y: 500 }}         
        />
      </Spin>
    </div>
  );
};

export default RCSearchsListTable;
