import React, { useEffect, useState } from 'react';
import Spin from 'src/components/common/Spin';
import styles from './MetadataTable.module.less';
import { Button, Table } from 'antd';
import ConfirmationCentered from 'src/components/common/ConfirmationCentered';
import { Sorting } from 'src/types/Sorting';
import { getColumns } from './services/MetadataTable.service';
import { PaginationConfig, SorterResult } from 'antd/lib/table';
import MetadataInfo from 'src/types/MetadataInfo';
import DefaultTableQueryParams from 'src/types/DefaultTableQueryParams';
import SORT_ORDER from 'src/enums/sortOrder';
import { useGetSiteMetadataList } from 'src/api/siteMetadata';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDeleteMetadata } from 'src/api/siteMetadata';

type MetadataTableProps = {
  siteId: string | undefined;
  schema: string | undefined;
  onEditMetadata: (metadata: MetadataInfo | {}) => void;
  requestParams: DefaultTableQueryParams;
  setRequestParams: (params: DefaultTableQueryParams) => void;
  onUpdate: () => void;
};
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_NUMBER = 0;

const MetadataTable: React.FC<MetadataTableProps> = ({
  siteId,
  schema,
  onEditMetadata,
  requestParams,
  setRequestParams,
  onUpdate,
}) => {
  const locale = { items_per_page: '' };
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [page, setPage] = useState(PAGE_NUMBER);
  const [currentColumn] = useState('name');
  const [currentOrder] = useState('ascend');
  const [sorting, setSorting] = useState({ field: currentColumn, order: currentOrder } as Sorting<MetadataInfo>);
  const [columns, setColumns] = useState<any[]>([]);
  const [selectedRowKeyVal, setSelectedRowKeyVal] = useState<any[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const [loading, totalRecords, metadataList] = useGetSiteMetadataList(requestParams);
  const [deletedIds, setDeletedIds] = useState<string>('');
  const [confirmationVisible, setConfirmationVisible] = useState<boolean>(false);
  const [deletedNames, setDeletedNames] = useState<string>('');
  useDeleteMetadata(schema, deletedIds, setDeletedIds, onUpdate);
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
    let newParams: any = {
      pagesize: pageSize,
      pagestart: getOffset(page, pageSize),
      siteId: siteId,
      verticalName: schema,
    };
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
    setSelectedRowKeys([]);
    setSelectedRowKeyVal([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting, page, pageSize]);

  const handlePageSizeChanges = (_: number, size: number): void => {
    setPageSize(size);
  };

  const handlerSortingColumn = (
    _: PaginationConfig,
    __: Partial<Record<keyof MetadataInfo, string[]>>,
    sorter: SorterResult<MetadataInfo>
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

  const onEdit = () => {
    onEditMetadata(selectedRowKeyVal[0]);
    setSelectedRowKeys([]);
    setSelectedRowKeyVal([]);
  };

  const onAddMetadata = () => {
    onEditMetadata({});
  };

  const onDelete = () => {
    const ids = selectedRowKeyVal.map(item => item.ID).join(',');
    setDeletedIds(ids);
    setSelectedRowKeys([]);
    setSelectedRowKeyVal([]);
  };

  const showModal = () => {
    const names = selectedRowKeyVal.map(item => item.name).join(', ');
    setDeletedNames(names);
    setConfirmationVisible(true);
  };

  return (
    <>
      <div className={styles.metadata_title}>
        <Button type={'default'} onClick={onAddMetadata} className={styles.metadata_title_button}>
          <FontAwesomeIcon icon={['fal', 'plus-circle']} size="lg" style={{ marginRight: '7px' }} />
          Add Metadata
        </Button>
      </div>
      <div className={styles.metadata_actions}>
        <ConfirmationCentered
          title={'Delete the metadata entries'}
          name={deletedNames}
          visible={confirmationVisible}
          onAction={onDelete}
          setVisible={setConfirmationVisible}
        />
        <Button
          type="link"
          onClick={showModal}
          className={styles.metadata_action_button}
          disabled={selectedRowKeys.length === 0}
        >
          Delete
        </Button>{' '}
        |
        <Button
          type="link"
          className={styles.metadata_action_button}
          disabled={selectedRowKeys.length !== 1}
          onClick={onEdit}
        >
          Edit
        </Button>
      </div>
      <Spin spinning={loading}>
        <Table
          rowClassName={(): string => styles.metadata_table_row}
          className={styles.metadata_table}
          rowKey={(_, index: number): string => index.toString()}
          columns={columns}
          pagination={pagination}
          dataSource={metadataList}
          tableLayout={'auto'}
          onChange={handlerSortingColumn}
          locale={{ emptyText: emptyText }}
          rowSelection={rowSelection}
        />
      </Spin>
    </>
  );
};

export default MetadataTable;
