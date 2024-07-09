import React, { useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import { SorterResult, PaginationConfig } from 'antd/lib/table';
import { Sorting } from 'src/types/Sorting';
import styles from './SKUTable.module.less';
import { getColumns } from '../services/SKUTable.service';
import Spin from 'src/components/common/Spin';
import SKUInfo from 'src/types/SKU_Info';
import ConfirmationCentered from 'src/components/common/ConfirmationCentered';

export type SKUTableProps = {
  items: SKUInfo[];
  sorting: Sorting<SKUInfo>;
  onSortingChange: (sorting: Sorting<SKUInfo>) => void;
  onPageSizeChange: (size: number) => void;
  onPageChange: (page: number) => void;
  pageSize: number;
  total: number;
  loading?: boolean;
  page?: number;
  onExport: () => void;
};

const SKUTable: React.FC<SKUTableProps> = ({
  items,
  sorting,
  pageSize,
  total,
  loading,
  page,
  onSortingChange,
  onPageChange,
  onPageSizeChange,
  onExport,
}: SKUTableProps): React.ReactElement => {
  const locale = { items_per_page: '' };
  const [columns, setColumns] = useState<any[]>([]);
  const [confirmationExportVisible, setConfirmationExportVisible] = useState<boolean>(false);
  const totalRender = (): React.ReactNode => <span>Total Results: {total}</span>;
  const emptyText: React.ReactNode = (): React.ReactNode => {
    return <p className={styles.no_results}>No results found</p>;
  };

  useEffect(() => {
    if (sorting) {
      setColumns(getColumns(sorting));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting]);

  const handlePageSizeChanges = (_: number, size: number): void => {
    onPageSizeChange(size);
  };

  const handlerSortingColumn = (
    _: PaginationConfig,
    __: Partial<Record<keyof SKUInfo, string[]>>,
    sorter: SorterResult<SKUInfo>
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
    total: total,
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
        rowClassName={(): string => styles.sku_list_table_row}
        className={styles.sku_list_table}
        rowKey={(_, index: number): string => index.toString()}
        columns={columns}
        pagination={pagination}
        dataSource={items}
        onChange={handlerSortingColumn}
        tableLayout={'auto'}
        locale={{ emptyText: emptyText }}
      />
      <div className={styles.export_wrapper}>
        <ConfirmationCentered
          title={'Export the records'}
          visible={confirmationExportVisible}
          onAction={onExport}
          setVisible={setConfirmationExportVisible}
        />
        <Button onClick={() => setConfirmationExportVisible(true)} type="primary" disabled={items.length === 0}>
          Export
        </Button>
      </div>
    </Spin>
  );
};

export default SKUTable;
