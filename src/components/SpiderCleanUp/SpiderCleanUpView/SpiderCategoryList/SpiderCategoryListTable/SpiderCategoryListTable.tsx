import React, { useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import ConfirmationCentered from 'src/components/common/ConfirmationCentered';
import { SorterResult, PaginationConfig } from 'antd/lib/table';
import { Sorting } from 'src/types/Sorting';
import SpiderCategoryTableInfo from 'src/types/SpiderCategoryTableInfo';
import styles from './SpiderCategoryListTable.module.less';
import { getColumns } from '../services/SpiderCategoryListTable.service';
import Spin from 'src/components/common/Spin';

export type SpiderCategoryListTableProps = {
  items: SpiderCategoryTableInfo[];
  sorting: Sorting<SpiderCategoryTableInfo>;
  onSortingChange: (sorting: Sorting<SpiderCategoryTableInfo>) => void;
  onPageSizeChange: (size: number) => void;
  onPageChange: (page: number) => void;
  onCleanUpList: () => void;
  pageSize: number;
  totalRecords: number;
  loading?: boolean;
  page?: number;
  disabledCleanUp: boolean;
  onExport: () => void;
  file: any;
};

const SpiderCategoryListTable: React.FC<SpiderCategoryListTableProps> = ({
  items,
  sorting,
  pageSize,
  totalRecords,
  loading,
  page,
  onCleanUpList,
  onSortingChange,
  onPageChange,
  onPageSizeChange,
  disabledCleanUp,
  onExport,
  file,
}: SpiderCategoryListTableProps): React.ReactElement => {
  const locale = { items_per_page: '' };
  const [columns, setColumns] = useState<any[]>([]);
  const [confirmationVisible, setConfirmationVisible] = useState<boolean>(false);
  const [confirmationExportVisible, setConfirmationExportVisible] = useState<boolean>(false);
  const totalRender = (): React.ReactNode => <span>Total Results: {totalRecords}</span>;

  useEffect(() => {
    if (sorting) {
      setColumns(getColumns(sorting));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting]);

  const emptyText: React.ReactNode = (): React.ReactNode => {
    if (!disabledCleanUp) {
      return <p className={styles.no_results}>No results found</p>;
    } else {
      return <p className={styles.no_results}>Select Vertical and Site to refine your results</p>;
    }
  };

  const handlePageSizeChanges = (_: number, size: number): void => {
    onPageSizeChange(size);
  };

  const handlerSortingColumn = (
    _: PaginationConfig,
    __: Partial<Record<keyof SpiderCategoryTableInfo, string[]>>,
    sorter: SorterResult<SpiderCategoryTableInfo>
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

  const onDelete = () => {
    onCleanUpList();
  };

  return (
    <div className={styles.spider_cleanup_list_table_wrapper}>
      <Spin spinning={loading}>
        <Table
          rowClassName={(): string => styles.spider_cleanup_list_table_row}
          className={styles.spider_cleanup_list_table}
          rowKey={(_, index: number): string => index.toString()}
          columns={columns}
          pagination={pagination}
          dataSource={items}
          onChange={handlerSortingColumn}
          tableLayout={'auto'}
          locale={{ emptyText: emptyText }}
        />
        <div className={styles.clean_up_wrapper}>
          <ConfirmationCentered
            title={'Delete the categories'}
            visible={confirmationVisible}
            onAction={onDelete}
            setVisible={setConfirmationVisible}
          />
          <Button onClick={() => setConfirmationVisible(true)} type="primary" disabled={disabledCleanUp}>
            Cleanup
          </Button>
          <ConfirmationCentered
            title={'Export the categories'}
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

export default SpiderCategoryListTable;
