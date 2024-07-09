import React, { useEffect, useState } from 'react';
import Spin from 'src/components/common/Spin';
import styles from '../ConfigurationClientSites.module.less';
import { getColumns } from '../services/ConfigurationSourceSitesTable.service';
import { ConfigureClientSitesTableInfo } from 'src/types/ConfigureClientSitesTableInfo';
import { Button, Table } from 'antd';
import ConfirmationCentered from 'src/components/common/ConfirmationCentered';
import { PaginationConfig, SorterResult } from 'antd/lib/table';
import { Sorting } from 'src/types/Sorting';
import SORT_ORDER from 'src/enums/sortOrder';
import { useDeleteSiteFromClient, useGetConfigureSiteList } from 'src/api/configureSiteList';

type ConfigurationSourceSitesTableProps = {
  clientId: string | undefined;
  onEditSite: any;
  requestParams: any;
  setRequestParams: any;
  onChangeStatus: (record: any) => void;
  onUpdatePrimaryStatus: any;
  onRegionView: (record: any) => void;
};
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_NUMBER = 0;

const ConfigurationSourceSitesTable: React.FC<ConfigurationSourceSitesTableProps> = ({
  clientId,
  onEditSite,
  requestParams,
  setRequestParams,
  onChangeStatus,
  onUpdatePrimaryStatus,
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
  const [loading, totalRecords, siteList] = useGetConfigureSiteList(clientId, requestParams, onUpdatePrimaryStatus);
  const [deletedSiteList, setDeletedSiteList] = useState<any[]>([]);
  const [confirmationVisible, setConfirmationVisible] = useState<boolean>(false);
  const [deletedSiteNames, setDeletedSiteNames] = useState<string>('');
  const totalRender = (): React.ReactNode => <span>Total Results: {totalRecords}</span>;
  const emptyText: React.ReactNode = <p className={styles.no_results}>No results found</p>;

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

  useEffect(() => {
    let newParams: any = { size: pageSize, offset: getOffset(page, pageSize), sourcesite: '1,2', iocl: 1 };

    if (sorting) {
      newParams = {
        ...newParams,
        sortingorder: SORT_ORDER[sorting.order],
        sortingcolumn: sorting.field.toLowerCase(),
      };
    }
    setRequestParams(newParams);
    if (sorting) {
      setColumns(getColumns(sorting, setPrimaryStatus, onRegionView));
    }
    setSelectedRowKeys([]);
    setSelectedRowKeyVal([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting, page, pageSize]);

  const setPrimaryStatus = (record: any) => {
    return (e: any) => {
      const STATUS_PRIMARY_OFF = 2;
      e.stopPropagation();
      if (record.ownerClientLookup.sourceSite === STATUS_PRIMARY_OFF) {
        onChangeStatus(record);
      }
    };
  };

  const getOffset = (page: number, size: number): number => {
    if (requestParams && requestParams.size && requestParams.size !== pageSize) {
      setPage(PAGE_NUMBER);
      return PAGE_NUMBER;
    }

    return page > 1 ? (page - 1) * size : PAGE_NUMBER;
  };

  const handlePageSizeChanges = (_: number, size: number): void => {
    setPageSize(size);
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
    const editedSite = selectedRowKeyVal[0];
    editedSite.type = 'Source';
    onEditSite(editedSite);
    setSelectedRowKeys([]);
    setSelectedRowKeyVal([]);
  };

  const isDeleteDisabled = () => {
    if (selectedRowKeys.length === 0) {
      return true;
    }
    return selectedRowKeyVal.filter(row => row.ownerClientLookup.sourceSite === 1).length === 1;
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
          disabled={isDeleteDisabled()}
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

export default ConfigurationSourceSitesTable;
