import React, { useEffect, useState } from 'react';
import Spin from 'src/components/common/Spin';
import styles from './ConfigurationSiteRegionTable.module.less';
import { Button, Table } from 'antd';
import ConfirmationCentered from 'src/components/common/ConfirmationCentered';
import { Sorting } from 'src/types/Sorting';
import { getColumns } from './services/ConfigurationSiteRegionTable.service';
import { PaginationConfig, SorterResult } from 'antd/lib/table';
import ConfigureRegionInfo from 'src/types/ConfigureRegionInfo';
import ConfigureRegionQueryParams from 'src/types/ConfigureRegionQueryParams';
import SORT_ORDER from 'src/enums/sortOrder';
import { useGetConfigureRegionList, useDeleteRegionFromSite } from 'src/api/configureRegions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type ConfigurationSiteRegionTableProps = {
  clientId: string | undefined;
  schema: string | undefined;
  siteId: string | undefined;
  onEditRegion: any;
  requestParams: ConfigureRegionQueryParams;
  setRequestParams: (params: ConfigureRegionQueryParams) => void;
  onChangeStatus: any;
  openRegionModal: any;
};
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_NUMBER = 0;

const ConfigurationSiteRegionTable: React.FC<ConfigurationSiteRegionTableProps> = ({
  clientId,
  schema,
  siteId,
  onEditRegion,
  requestParams,
  setRequestParams,
  onChangeStatus,
  openRegionModal,
}) => {
  const locale = { items_per_page: '' };
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [page, setPage] = useState(PAGE_NUMBER);
  const [currentColumn] = useState('name');
  const [currentOrder] = useState('ascend');
  const [sorting, setSorting] = useState({ field: currentColumn, order: currentOrder } as Sorting<ConfigureRegionInfo>);
  const [columns, setColumns] = useState<any[]>([]);
  const [selectedRowKeyVal, setSelectedRowKeyVal] = useState<any[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const [loading, totalRecords, siteList] = useGetConfigureRegionList(clientId, siteId, requestParams);
  const [deletedRegionList, setDeletedRegionList] = useState<any[]>([]);
  const [confirmationVisible, setConfirmationVisible] = useState<boolean>(false);
  const [deletedRegionsNames, setDeletedRegionNames] = useState<string>('');
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
  useDeleteRegionFromSite(clientId, deletedRegionList, setDeletedRegionList, onUpdate);
  const totalRender = (): React.ReactNode => <span>Total Results: {totalRecords}</span>;
  const emptyText: React.ReactNode = <p className={styles.no_results}>No results found</p>;

  useEffect(() => {
    let newParams: any = { pagesize: pageSize, pagestart: getOffset(page, pageSize) };
    if (sorting) {
      newParams = {
        ...newParams,
        sortingorder: SORT_ORDER[sorting.order],
        sortingcolumn: sorting.field.toLowerCase(),
      };
    }
    if (schema) {
      newParams.verticalName = schema;
    }
    setRequestParams(newParams);
    if (sorting) {
      setColumns(getColumns(sorting, onChangeStatus));
    }
    setSelectedRowKeys([]);
    setSelectedRowKeyVal([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schema, sorting, page, pageSize]);

  const handlePageSizeChanges = (_: number, size: number): void => {
    setPageSize(size);
  };

  const getOffset = (page: number, size: number): number => {
    if (requestParams && requestParams.pagesize && requestParams.pagesize !== pageSize) {
      setPage(PAGE_NUMBER);
      return PAGE_NUMBER;
    }

    return page > 1 ? (page - 1) * size : PAGE_NUMBER;
  };

  const handlerSortingColumn = (
    _: PaginationConfig,
    __: Partial<Record<keyof ConfigureRegionInfo, string[]>>,
    sorter: SorterResult<ConfigureRegionInfo>
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
    setDeletedRegionList(selectedRowKeyVal);
    setSelectedRowKeys([]);
    setSelectedRowKeyVal([]);
  };

  const onEdit = () => {
    onEditRegion(selectedRowKeyVal[0]);
    setSelectedRowKeys([]);
    setSelectedRowKeyVal([]);
  };

  const showConfirmation = () => {
    const names = selectedRowKeyVal.map(region => region.name).join(', ');
    setDeletedRegionNames(names);
    setConfirmationVisible(true);
  };

  return (
    <>
      <div className={styles.add_region_wrapper}>
        <Button type={'default'} onClick={openRegionModal} className={styles.add_region_button}>
          <FontAwesomeIcon icon={['fal', 'plus-circle']} size="lg" className={styles.add_region_icon} />
          Add Region
        </Button>
      </div>
      <div className={styles.region_actions}>
        <ConfirmationCentered
          title={'Delete the regions'}
          name={deletedRegionsNames}
          visible={confirmationVisible}
          onAction={onDelete}
          setVisible={setConfirmationVisible}
        />
        <Button
          type="link"
          className={styles.region_action_button}
          disabled={selectedRowKeys.length === 0}
          onClick={showConfirmation}
        >
          Delete
        </Button>{' '}
        |
        <Button
          type="link"
          className={styles.region_action_button}
          disabled={selectedRowKeys.length !== 1}
          onClick={onEdit}
        >
          Edit
        </Button>
      </div>
      <Spin spinning={loading}>
        <Table
          rowClassName={(): string => styles.region_table_row}
          className={styles.region_table}
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

export default ConfigurationSiteRegionTable;
