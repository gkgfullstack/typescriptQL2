import React, { useEffect, useState } from 'react';
import Spin from 'src/components/common/Spin';
import styles from './StatusPageTable.module.less';
import { Table } from 'antd';
import { Sorting } from 'src/types/Sorting';
import { getColumns } from './services/StatusPageTable.service';
import { PaginationConfig, SorterResult } from 'antd/lib/table';
import ConfigureJobStatusTableInfo from 'src/types/ConfigureJobStatusTableInfo';
import SORT_ORDER from 'src/enums/sortOrder';
import { useGetActiveJobsStatus } from 'src/api/activeJobStatus';

type StatusPageTableProps = {
  runId: string | null;
};
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_NUMBER = 0;

const StatusPageTable: React.FC<StatusPageTableProps> = ({ runId }) => {
  const locale = { items_per_page: '' };
  const isAdminMode: boolean = localStorage.getItem('bAdminMode') === 'true';
  const isAppAdmin: boolean = localStorage.getItem('hasAppAdminPriv') === 'true';
  const [requestParams, setRequestParams] = useState<any>({});
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [page, setPage] = useState(PAGE_NUMBER);
  const [currentColumn] = useState('id');
  const [currentOrder] = useState('ascend');
  const [sorting, setSorting] = useState({ field: currentColumn, order: currentOrder } as Sorting<
    ConfigureJobStatusTableInfo
  >);
  const [columns, setColumns] = useState<any[]>([]);
  const [loading, totalRecords, statusList] = useGetActiveJobsStatus(requestParams);
  const totalRender = (): React.ReactNode => <span>Total Results: {totalRecords}</span>;
  const emptyText: React.ReactNode = <p className={styles.no_results}>No results found</p>;
  const getOffset = (page: number, size: number): number => {
    if (requestParams && requestParams.size && requestParams.size !== pageSize) {
      setPage(PAGE_NUMBER);
      return PAGE_NUMBER;
    }

    return page > 1 ? (page - 1) * size : PAGE_NUMBER;
  };

  useEffect(() => {
    let newParams: any = { id: runId, size: pageSize, offset: getOffset(page, pageSize) };
    if (sorting) {
      newParams = {
        ...newParams,
        sortingorder: SORT_ORDER[sorting.order],
        sortingcolumn: sorting.field.toLowerCase(),
      };
    }
    setRequestParams(newParams);
    if (sorting) {
      setColumns(getColumns(sorting, { isAdminMode, isAppAdmin }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting, page, pageSize]);

  const handlePageSizeChanges = (_: number, size: number): void => {
    setPageSize(size);
  };

  const handlerSortingColumn = (
    _: PaginationConfig,
    __: Partial<Record<keyof ConfigureJobStatusTableInfo, string[]>>,
    sorter: SorterResult<ConfigureJobStatusTableInfo>
  ): void => {
    const order =
      sorting.field === sorter.columnKey && sorter.order === undefined
        ? sorting.order === 'ascend'
          ? 'descend'
          : 'ascend'
        : sorter.order;

    setSorting({ field: sorter.columnKey, order: order });
  };

  const handlerPageChange = (page: number): void => {
    setPage(page);
  };

  const pagination: PaginationConfig = {
    pageSize: pageSize,
    current: page,
    showTotal: totalRender,
    total: totalRecords,
    hideOnSinglePage: false,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50'],
    locale: locale,
    onShowSizeChange: handlePageSizeChanges,
    onChange: handlerPageChange,
  };

  return (
    <Spin spinning={loading}>
      <Table
        rowClassName={(): string => styles.status_page_table_row}
        className={styles.status_page_table}
        rowKey={(_, index: number): string => index.toString()}
        columns={columns}
        pagination={pagination}
        dataSource={statusList}
        tableLayout={'auto'}
        onChange={handlerSortingColumn}
        locale={{ emptyText: emptyText }}
      />
    </Spin>
  );
};

export default StatusPageTable;
