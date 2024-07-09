import React from 'react';
import { Table } from 'antd';
import { SorterResult, PaginationConfig } from 'antd/lib/table';
import { Sorting } from 'src/types/Sorting';
import ProductFinderInfo from 'src/types/ProductFinderInfo';
import { useProductListTableColumns } from '../hooks';
import Spin from 'src/components/common/Spin';
import styles from './ProductListTable.module.less';
//import useQueryUrlParams from 'src/hooks/useQueryUrlParams';
import useQueryUrlParamsDispatch from 'src/hooks/useQueryUrlParamsDispatch';
//import ProductFinderQueryParams from 'src/types/ProductFinderQueryParams';

export type ProductListTableProps = {
  items: ProductFinderInfo[];
  sorting: Sorting<ProductFinderInfo>;
  onSortingChange: (sorting: Sorting<ProductFinderInfo>) => void;
  onPageSizeChange: (size: number) => void;
  onPageChange: (page: number) => void;
  pageSize: number;
  total: number;
  loading?: boolean;
  page?: number;
};

const ProductListTable: React.FC<ProductListTableProps> = ({
  items,
  sorting,
  pageSize,
  total,
  loading,
  page,
  onSortingChange,
  onPageChange,
  onPageSizeChange,
}: ProductListTableProps): React.ReactElement => {
  const setQuery = useQueryUrlParamsDispatch();
  const locale = { items_per_page: '' }; 
  const [columns] = useProductListTableColumns(sorting);
  const handlePageSizeChanges = (_: number, size: number): void => {
    onPageSizeChange(size);
    setQuery({back:false });
    localStorage.removeItem('URL')
    localStorage.removeItem('pageVal')
  };
  const handlerSortingColumn = (
    _: PaginationConfig,
    __: Partial<Record<keyof ProductFinderInfo, string[]>>,
    sorter: SorterResult<ProductFinderInfo>
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
    localStorage.setItem("pageVal",page.toString());
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
    <div className="product_list_container">
      <Spin spinning={loading}>
        <Table
          rowClassName={(): string => styles.product_table_row}
          rowKey={(_, index: number): string => index.toString()}
          columns={columns}
          pagination={pagination}
          dataSource={items}
          onChange={handlerSortingColumn}
          tableLayout={'auto'}
          locale={{ emptyText: emptyText }}
          scroll={{ x: 'calc(500px + 50%)'}}
        />
      </Spin>
    </div>
  );
};

export default ProductListTable;
