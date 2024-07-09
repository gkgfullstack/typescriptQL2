import React, { useEffect, useState } from 'react';
import Spin from 'src/components/common/Spin';
import styles from '../ConfigurationClientSites.module.less';
import { Button, Table } from 'antd';
import ConfirmationCentered from 'src/components/common/ConfirmationCentered';
import { Sorting } from 'src/types/Sorting';
import { getColumns } from '../services/ConfigurationCompetitorSitesTable.service';
import { PaginationConfig, SorterResult } from 'antd/lib/table';
import { ConfigureClientSitesTableInfo } from 'src/types/ConfigureClientSitesTableInfo';
import SORT_ORDER from 'src/enums/sortOrder';
import { useGetConfigureSiteList, useDeleteSiteFromClient } from 'src/api/configureSiteList';

type ConfigurationCompetitorSitesTableProps = {
  clientId: string | undefined;
  onEditSite: any;
  requestParams: any;
  setRequestParams: any;
  onChangeStatus: (record: any) => void;
  onRegionView: (record: any) => void;
};
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_NUMBER = 0;

const ConfigurationCompetitorSitesTable: React.FC<ConfigurationCompetitorSitesTableProps> = ({
  clientId,
  onEditSite,
  requestParams,
  setRequestParams,
  onChangeStatus,
  onRegionView,
}) => {
  const locale = { items_per_page: '' };
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [page, setPage] = useState(PAGE_NUMBER);
  const [currentColumn] = useState('name');
  const [currentOrder] = useState('ascend');
  const [sorting, setSorting] = useState({ field: currentColumn, order: currentOrder } as Sorting<
    ConfigureClientSitesTableInfo
  >);
  const [columns, setColumns] = useState<any[]>([]);
  const [selectedRowKeyVal, setSelectedRowKeyVal] = useState<any[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const [loading, totalRecords, siteList] = useGetConfigureSiteList(clientId, requestParams);
  const [deletedSiteList, setDeletedSiteList] = useState<any[]>([]);
  const [confirmationVisible, setConfirmationVisible] = useState<boolean>(false);
  const [deletedSiteNames, setDeletedSiteNames] = useState<string>('');
  const onUpdate = (length: any) => {
    if (page === 0 || !(totalRecords - length < page * pageSize - pageSize + 1)) {
      setRequestParams({
        ...requestParams,
      });
    } else {
      const newPage = page > 1 ? page - 1 : PAGE_NUMBER;
      setPage(newPage);
    }
  };
  useDeleteSiteFromClient(deletedSiteList, clientId, setDeletedSiteList, onUpdate);
  const totalRender = (): React.ReactNode => <span>Total Results: {totalRecords}</span>;
  const emptyText: React.ReactNode = <p className={styles.no_results}>No results found</p>;

  useEffect(() => {
    let newParams: any = { size: pageSize, offset: getOffset(page, pageSize), sourcesite: 0, iocl: 1 };
    if (sorting) {
      newParams = {
        ...newParams,
        sortingorder: SORT_ORDER[sorting.order],
        sortingcolumn: sorting.field.toLowerCase(),
      };
    }
    setRequestParams(newParams);
    if (sorting) {
      setColumns(getColumns(sorting, onChangeStatus, onRegionView));
    }
    setSelectedRowKeys([]);
    setSelectedRowKeyVal([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting, page, pageSize]);

  const handlePageSizeChanges = (_: number, size: number): void => {
    setPageSize(size);
  };

  const getOffset = (page: number, size: number): number => {
    if (requestParams && requestParams.size && requestParams.size !== pageSize) {
      setPage(PAGE_NUMBER);
      return PAGE_NUMBER;
    }

    return page > 1 ? (page - 1) * size : PAGE_NUMBER;
  };

  const handlerSortingColumn = (
    _: PaginationConfig,
    __: Partial<Record<keyof ConfigureClientSitesTableInfo, string[]>>,
    sorter: SorterResult<ConfigureClientSitesTableInfo>
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

  const onSelectedRowKeysChange = (selectedRowKeys: any, selectedRows: any[]) => {
    setSelectedRowKeys(selectedRowKeys);
    setSelectedRowKeyVal(selectedRows);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectedRowKeysChange,
  };

  const onDelete = () => {
    setDeletedSiteList(selectedRowKeyVal);
    setSelectedRowKeys([]);
    setSelectedRowKeyVal([]);
  };

  const onEdit = () => {
    onEditSite(selectedRowKeyVal[0]);
    setSelectedRowKeys([]);
    setSelectedRowKeyVal([]);
  };

  const showConfirmation = () => {
    const names = selectedRowKeyVal.map(site => site.name).join(', ');
    setDeletedSiteNames(names);
    setConfirmationVisible(true);
  };

  return (
    <>
      <div className={styles.client_info_actions}>
        <ConfirmationCentered
          title={'Delete the sites'}
          name={deletedSiteNames}
          visible={confirmationVisible}
          onAction={onDelete}
          setVisible={setConfirmationVisible}
        />
        <Button
          type="link"
          className={styles.client_info_action_button}
          disabled={selectedRowKeys.length === 0}
          onClick={showConfirmation}
        >
          Delete
        </Button>{' '}
        |
        <Button
          type="link"
          className={styles.client_info_action_button}
          disabled={selectedRowKeys.length !== 1}
          onClick={onEdit}
        >
          Edit
        </Button>
      </div>
      <Spin spinning={loading}>
        <Table
          rowClassName={(): string => styles.client_info_table_row}
          className={styles.client_info_table}
          rowKey={(_, index: number): string => index.toString()}
          columns={columns}
          pagination={pagination}
          dataSource={siteList}
          tableLayout={'auto'}
          onChange={handlerSortingColumn}
          locale={{ emptyText: emptyText }}
          rowSelection={rowSelection}
        />
      </Spin>
    </>
  );
};

export default ConfigurationCompetitorSitesTable;
