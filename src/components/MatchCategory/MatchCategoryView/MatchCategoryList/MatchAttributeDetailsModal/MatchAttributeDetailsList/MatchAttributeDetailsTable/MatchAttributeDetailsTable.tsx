import React, { useEffect, useState } from 'react';
import Spin from 'src/components/common/Spin';
import styles from './MatchAttributeDetailsTable.module.less';
import { Button, Table } from 'antd';
import { Sorting } from 'src/types/Sorting';
import { defaultColumns, getColumns } from '../services/MatchAttributeDetailsTable.service';
import { PaginationConfig, SorterResult } from 'antd/lib/table';
import MatchAttributeDetails from 'src/types/matchAttributeDetails';
import SORT_ORDER from 'src/enums/sortOrder';
import { useGetMatchAttributeDetails } from 'src/api/matchAttribute';
import ConfirmationCentered from 'src/components/common/ConfirmationCentered';
import { useDeleteMatchAttributeMap } from 'src/api/matchAttributeMap';

type MatchAttributeDetailsTableProps = {
  requestParams: any;
  setRequestParams: any;
  matchAttributeId: string | undefined;
  onEdit: any;
  onEditLocation: any;
};
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_NUMBER = 0;

const MatchAttributeDetailsTable: React.FC<MatchAttributeDetailsTableProps> = ({
  requestParams,
  setRequestParams,
  matchAttributeId,
  onEdit,
  onEditLocation,
}) => {
  const locale = { items_per_page: '' };
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [page, setPage] = useState(PAGE_NUMBER);
  const [currentColumn] = useState('ownerName');
  const [currentOrder] = useState('ascend');
  const [selectedRowKeyVal, setSelectedRowKeyVal] = useState<any[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<any[]>(defaultColumns);
  const [sorting, setSorting] = useState({ field: currentColumn, order: currentOrder } as Sorting<
    MatchAttributeDetails
  >);
  const [columns, setColumns] = useState<any[]>([]);
  const [loading, totalRecords, clientList] = useGetMatchAttributeDetails(matchAttributeId, requestParams);
  const [confirmationVisible, setConfirmationVisible] = useState<boolean>(false);
  const [selectedMapNames, setSelectedMapNames] = useState<string>('');
  const [deletedMatchAttributeMapIds, setDeletedMatchAttributeMapIds] = useState<string>('');
  const onUpdate = (length: number) => {
    if (page === 0 || !(totalRecords - length < page * pageSize - pageSize + 1)) {
      setRequestParams({
        ...requestParams,
      });
    } else {
      const newPage = page > 1 ? page - 1 : PAGE_NUMBER;
      setPage(newPage);
    }
  };
  useDeleteMatchAttributeMap(deletedMatchAttributeMapIds, setDeletedMatchAttributeMapIds, onUpdate);

  const totalRender = (): React.ReactNode => <span>Total Results: {totalRecords}</span>;
  const emptyText: React.ReactNode = <p className={styles.no_results}>No results found</p>;
  const getOffset = (page: number, size: number): number => {
    if (requestParams && requestParams.pagesize && requestParams.pagesize !== pageSize) {
      setPage(PAGE_NUMBER);
      return PAGE_NUMBER;
    }

    return page > 1 ? (page - 1) * size : PAGE_NUMBER;
  };
  const onColumnChange = (value: string) => {
    const selectedValues = value.split(',');
    setSelectedColumns(selectedValues);
  };

  useEffect(() => {
    let newParams: any = {
      pagesize: pageSize,
      pagestart: getOffset(page, pageSize),
    };
    if (sorting) {
      newParams = {
        ...newParams,
        sortingorder: SORT_ORDER[sorting.order],
        sortingcolumn: sorting.field.toLowerCase(),
      };
    }
    setRequestParams(newParams);
    if (sorting && selectedColumns) {
      setColumns(getColumns(sorting, selectedColumns, onColumnChange));
    }
    setSelectedRowKeys([]);
    setSelectedRowKeyVal([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedColumns, sorting, page, pageSize]);

  const handlePageSizeChanges = (_: number, size: number): void => {
    setPageSize(size);
  };

  const handlerSortingColumn = (
    _: PaginationConfig,
    __: Partial<Record<keyof MatchAttributeDetails, string[]>>,
    sorter: SorterResult<MatchAttributeDetails>
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

  const onEditMatchAttributeMap = () => {
    onEdit(selectedRowKeyVal[0]);
    setSelectedRowKeys([]);
    setSelectedRowKeyVal([]);
  };

  const onDelete = () => {
    const ids = selectedRowKeyVal
      .map((item: any) => (item.matchAttributeMapId ? Number(item.matchAttributeMapId) : ''))
      .join(',');
    setDeletedMatchAttributeMapIds(ids);
    setSelectedRowKeys([]);
    setSelectedRowKeyVal([]);
  };

  const showModal = () => {
    const names = selectedRowKeyVal
      .map((item: any) => `${item.matchAttributeName}: ${item.rawAttributeName}`)
      .join(', ');
    setSelectedMapNames(names);
    setConfirmationVisible(true);
  };

  const isEditLocationDisabled = () => {
    const ownerIds: number[] = [];
    if (selectedRowKeyVal.length === 0) {
      return true;
    }
    selectedRowKeyVal.forEach((item: any) => {
      if (ownerIds.indexOf(item.ownerId) < 0) {
        ownerIds.push(item.ownerId);
      }
    });
    return ownerIds.length > 1;
  };

  const onEditLocationPriority = () => {
    onEditLocation(selectedRowKeyVal[0]);
    setSelectedRowKeys([]);
    setSelectedRowKeyVal([]);
  };

  return (
    <>
      <div className={styles.match_attribute_details_actions}>
        <ConfirmationCentered
          title={'Delete the match attribute map'}
          name={selectedMapNames}
          visible={confirmationVisible}
          onAction={onDelete}
          setVisible={setConfirmationVisible}
        />
        <Button
          type="link"
          onClick={showModal}
          className={styles.match_attribute_details_action_button}
          disabled={selectedRowKeys.length === 0}
        >
          Delete
        </Button>{' '}
        |
        <Button
          type="link"
          className={styles.match_attribute_details_action_button}
          disabled={selectedRowKeys.length !== 1}
          onClick={onEditMatchAttributeMap}
        >
          Edit
        </Button>
        |
        <Button
          type="link"
          className={styles.match_attribute_details_action_button}
          disabled={isEditLocationDisabled()}
          onClick={onEditLocationPriority}
        >
          Edit Location Priority
        </Button>
      </div>
      <Spin spinning={loading}>
        <Table
          rowClassName={(): string => styles.match_attribute_details_table_row}
          className={styles.match_attribute_details_table}
          rowKey={(_, index: number): string => index.toString()}
          columns={columns}
          pagination={pagination}
          dataSource={clientList}
          tableLayout={'auto'}
          onChange={handlerSortingColumn}
          locale={{ emptyText: emptyText }}
          rowSelection={rowSelection}
        />
      </Spin>
    </>
  );
};

export default MatchAttributeDetailsTable;
