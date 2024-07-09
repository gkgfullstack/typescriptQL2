import React, { useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import ConfirmationCentered from 'src/components/common/ConfirmationCentered';
import { SorterResult, PaginationConfig } from 'antd/lib/table';
import { Sorting } from 'src/types/Sorting';
import ShallowProductTableInfo from 'src/types/ShallowProductTableInfo';
import styles from './ShallowProductListTable.module.less';
import { getColumns } from '../services/ShallowProductListTable.service';
import Spin from 'src/components/common/Spin';

export type ShallowProductListTableProps = {
  items: ShallowProductTableInfo[];
  sorting: Sorting<ShallowProductTableInfo>;
  onSortingChange: (sorting: Sorting<ShallowProductTableInfo>) => void;
  onPageSizeChange: (size: number) => void;
  onPageChange: (page: number) => void;
  onDeleteList: (list: any) => void;
  pageSize: number;
  totalRecords: number;
  loading?: boolean;
  page?: number;
  disabledCleanUp: boolean;
  onExport: () => void;
  file: any;
};

const ShallowProductListTable: React.FC<ShallowProductListTableProps> = ({
  items,
  sorting,
  pageSize,
  totalRecords,
  loading,
  page,
  onSortingChange,
  onPageChange,
  onPageSizeChange,
  disabledCleanUp,
  onDeleteList,
  onExport,
  file,
}: ShallowProductListTableProps): React.ReactElement => {
  const locale = { items_per_page: '' };
  const [columns, setColumns] = useState<any[]>([]);
  const [confirmationVisible, setConfirmationVisible] = useState<boolean>(false);
  const [confirmationExportVisible, setConfirmationExportVisible] = useState<boolean>(false);
  const [deletedProductNames, setDeletedProductNames] = useState<string>('');
  const totalRender = (): React.ReactNode => <span>Total Results: {totalRecords}</span>;
  const [selectedRowKeyVal, setSelectedRowKeyVal] = useState<any[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);

  useEffect(() => {
    if (sorting) {
      setColumns(getColumns(sorting));
    }
    setSelectedRowKeys([]);
    setSelectedRowKeyVal([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting]);

  const emptyText: React.ReactNode = (): React.ReactNode => {
    if (!disabledCleanUp) {
      return <p className={styles.no_results}>No results found</p>;
    } else {
      return <p className={styles.no_results}>Select Vertical and Date Range to refine your results</p>;
    }
  };

  const handlePageSizeChanges = (_: number, size: number): void => {
    onPageSizeChange(size);
  };

  const handlerSortingColumn = (
    _: PaginationConfig,
    __: Partial<Record<keyof ShallowProductTableInfo, string[]>>,
    sorter: SorterResult<ShallowProductTableInfo>
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
    const ids = selectedRowKeyVal.map(item => item.siteId);
    onDeleteList(ids);
    setSelectedRowKeys([]);
    setSelectedRowKeyVal([]);
  };

  const onDeleteDisabled = () => {
    return selectedRowKeys.length === 0;
  };

  const showConfirmation = () => {
    const names = selectedRowKeyVal.map(site => site.siteName).join(', ');
    setDeletedProductNames(names);
    setConfirmationVisible(true);
  };

  return (
    <div className={styles.shallow_cleanup_list_table_wrapper}>
      <Spin spinning={loading}>
        <Table
          rowClassName={(): string => styles.shallow_cleanup_list_table_row}
          className={styles.shallow_cleanup_list_table}
          rowKey={(_, index: number): string => index.toString()}
          columns={columns}
          pagination={pagination}
          dataSource={items}
          onChange={handlerSortingColumn}
          tableLayout={'auto'}
          locale={{ emptyText: emptyText }}
          rowSelection={rowSelection}
        />
        <div className={styles.clean_up_wrapper}>
          <ConfirmationCentered
            title={'Delete the outdated records'}
            name={deletedProductNames}
            visible={confirmationVisible}
            onAction={onDelete}
            setVisible={setConfirmationVisible}
          />
          <Button
            type="primary"
            onClick={showConfirmation}
            className={styles.shallow_cleanup_info_action_button}
            disabled={onDeleteDisabled()}
          >
            Cleanup
          </Button>
          <ConfirmationCentered
            title={'Export the records'}
            visible={confirmationExportVisible}
            onAction={onExport}
            setVisible={setConfirmationExportVisible}
          />
          <Button
            onClick={() => setConfirmationExportVisible(true)}
            type="primary"
            disabled={disabledCleanUp || items.length === 0}
          >
            Export
          </Button>
          {file && (
            <a className={styles.clean_up_file_link} href={file.url} target={'_blank'} rel={'noopener noreferrer'}>
              {file.name}
            </a>
          )}
        </div>
      </Spin>
    </div>
  );
};

export default ShallowProductListTable;
