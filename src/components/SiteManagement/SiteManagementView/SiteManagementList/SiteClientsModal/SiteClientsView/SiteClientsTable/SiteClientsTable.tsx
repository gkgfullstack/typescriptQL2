import React, { useEffect, useState } from 'react';
import Spin from 'src/components/common/Spin';
import styles from './SiteClientsTable.module.less';
import { Table } from 'antd';
import { Sorting } from 'src/types/Sorting';
import { getColumns } from './services/SiteClientsTable.service';
import { PaginationConfig, SorterResult } from 'antd/lib/table';
import ConfigureClientTableInfo from 'src/types/ConfigureClientTableInfo';
import SORT_ORDER from 'src/enums/sortOrder';
import { useGetAllClientsOfSiteList } from 'src/api/siteManagement';

type SiteClientsTableProps = {
  siteId: string | undefined;
  schema: string | undefined;
};
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_NUMBER = 0;

const SiteClientsTable: React.FC<SiteClientsTableProps> = ({ siteId, schema, }) => {
  const locale = { items_per_page: '' };
  const [requestParams, setRequestParams] = useState<any>({});
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [page, setPage] = useState(PAGE_NUMBER);
  const [currentColumn] = useState('name');
  const [currentOrder] = useState('ascend');
  const [sorting, setSorting] = useState({ field: currentColumn, order: currentOrder } as Sorting<
    ConfigureClientTableInfo
  >);
  const [columns, setColumns] = useState<any[]>([]);
  const [loading, totalRecords, clientList] = useGetAllClientsOfSiteList(siteId, requestParams);

  const totalRender = (): React.ReactNode => <span>Total Results: {totalRecords}</span>;
  const emptyText: React.ReactNode = <p className={styles.no_results}>No results found</p>;
  const getOffset = (page: number, size: number): number => {
    if (requestParams && requestParams.pagesize && requestParams.pagesize !== pageSize) {
      setPage(PAGE_NUMBER);
      return PAGE_NUMBER;
    }

    return page > 1 ? (page - 1) * size : PAGE_NUMBER;
  };

  useEffect(() => {
    let newParams: any = { pagesize: pageSize, pagestart: getOffset(page, pageSize), verticalName: schema };
    if (sorting) {
      newParams = {
        ...newParams,
        sortingorder: SORT_ORDER[sorting.order],
        sortingcolumn: sorting.field.toLowerCase(),
      };
    }
    setRequestParams(newParams);
    if (sorting) {
      setColumns(getColumns(sorting));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting, page, pageSize]);

  const handlePageSizeChanges = (_: number, size: number): void => {
    setPageSize(size);
  };

  const handlerSortingColumn = (
    _: PaginationConfig,
    __: Partial<Record<keyof ConfigureClientTableInfo, string[]>>,
    sorter: SorterResult<ConfigureClientTableInfo>
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
    <>
      <Spin spinning={loading}>
        <Table
          rowClassName={(): string => styles.site_clients_table_row}
          className={styles.site_clients_table}
          rowKey={(_, index: number): string => index.toString()}
          columns={columns}
          pagination={pagination}
          dataSource={clientList}
          tableLayout={'auto'}
          onChange={handlerSortingColumn}
          locale={{ emptyText: emptyText }}
        />
      </Spin>
    </>
  );
};

export default SiteClientsTable;
