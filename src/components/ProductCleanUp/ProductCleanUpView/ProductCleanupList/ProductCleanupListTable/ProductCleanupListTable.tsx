import React, { useEffect, useState } from 'react';
import { Button, Table, Select } from 'antd';
import { SelectValue } from 'antd/lib/select';
import ConfirmationCentered from 'src/components/common/ConfirmationCentered';
import { SorterResult, PaginationConfig } from 'antd/lib/table';
import { Sorting } from 'src/types/Sorting';
import ProductCleanupTableInfo from 'src/types/ProductCleanupTableInfo';
import styles from './ProductCleanupListTable.module.less';
import {
  getColumns,
  getUniqueProductIds,
  getUniqueProductNames,
  defaultColumns,
} from '../services/ProductCleanupListTable.service';
import Spin from 'src/components/common/Spin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOff, faToggleOn } from '@fortawesome/pro-light-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const { Option } = Select;
const faToggleOffIcon = faToggleOff as IconProp;
const faToggleOnIcon = faToggleOn as IconProp;
const paginationOptions: any = [
  {
    id: '20',
    name: '10',
  },
  {
    id: '40',
    name: '20',
  },
  {
    id: '100',
    name: '50',
  },
];

export type ProductCleanupListTableProps = {
  items: ProductCleanupTableInfo[];
  sorting: Sorting<ProductCleanupTableInfo>;
  onSortingChange: (sorting: Sorting<ProductCleanupTableInfo>) => void;
  onPageSizeChange: (size: number) => void;
  onPageChange: (page: number) => void;
  onMergeList: (list: any) => void;
  onDifferentiateList: (list: any) => void;
  pageSize: number;
  totalRecords: number;
  loading?: boolean;
  page?: number;
  disabledCleanUp: boolean;
  setMergedAll: any;
  setDifferentiateAll: any;
};

const ProductCleanupListTable: React.FC<ProductCleanupListTableProps> = ({
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
  onMergeList,
  onDifferentiateList,
  setMergedAll,
  setDifferentiateAll,
}: ProductCleanupListTableProps): React.ReactElement => {
  const locale = { items_per_page: '' };
  const [columns, setColumns] = useState<any[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<any[]>(defaultColumns);
  const [mergeModalVisible, setMergeModalVisible] = useState<boolean>(false);
  const [differentiateModalVisible, setDifferentiateModalVisible] = useState<boolean>(false);
  const totalRender = (): React.ReactNode => <span>Total Results: {totalRecords}</span>;
  const [selectedRowKeyVal, setSelectedRowKeyVal] = useState<any[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const [selectedNames, setSelectedNames] = useState<any>('');
  const [hoverIndex, setHoverIndex] = useState<any>(undefined);
  const [isAllEnabled, setAllEnabled] = useState(true);
  const [isAllDisabled, setAllDisabled] = useState(false);

  const onColumnChange = (value: string) => {
    const selectedValues = value.split(',');
    setSelectedColumns(selectedValues);
  };

  useEffect(() => {
    setSelectedRowKeys([]);
    setSelectedRowKeyVal([]);
    setAllDisabled(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting, items]);

  useEffect(() => {
    if (sorting && selectedColumns) {
      setColumns(getColumns(sorting, selectedColumns, onColumnChange));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting, selectedColumns]);

  const emptyText: React.ReactNode = (): React.ReactNode => {
    if (!disabledCleanUp) {
      return <p className={styles.no_results}>No results found</p>;
    } else {
      return <p className={styles.no_results}>Select Vertical, Site and Fingerprint to refine your results</p>;
    }
  };

  const handlePageSizeChanges = (_: number, size: number): void => {
    onPageSizeChange(size);
  };

  const handlerSortingColumn = (
    _: PaginationConfig,
    __: Partial<Record<keyof ProductCleanupTableInfo, string[]>>,
    sorter: SorterResult<ProductCleanupTableInfo>
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

  const getSelectProductNames = (selectedRows: any) => {
    if (selectedRows.length === 0) {
      return '';
    }
    return getUniqueProductNames(selectedRows);
  };

  const onSelectedRowKeysChange = (selectedRowKeys: any, selectedRows: any[]) => {
    const duplicateProducts = [...selectedRows.filter((item: any) => item.isDuplicate)];
    if (duplicateProducts.length === 0) {
      setSelectedRowKeys([]);
      setSelectedRowKeyVal([]);
      setSelectedNames('');
      setAllDisabled(false);
    } else {
      setSelectedRowKeys(selectedRowKeys);
      setSelectedRowKeyVal(selectedRows);
      setSelectedNames(getSelectProductNames(selectedRows));
      setAllDisabled(true);
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectedRowKeysChange,
  };

  const onSelectProducts = () => {
    const selectedProductIds = getUniqueProductIds(selectedRowKeyVal);
    setSelectedRowKeys([]);
    setSelectedRowKeyVal([]);
    return selectedProductIds;
  };

  const isAllSelected = () => {
    return isAllEnabled && !isAllDisabled;
  };

  const onMerge = () => {
    if (isAllSelected()) {
      setMergedAll(true);
    } else {
      const ids = onSelectProducts();
      onMergeList(ids);
    }
  };

  const onDifferentiate = () => {
    if (isAllSelected()) {
      setDifferentiateAll(true);
    } else {
      const ids = onSelectProducts();
      onDifferentiateList(ids);
    }
  };

  const onDisabled = () => {
    if (totalRecords === 0) {
      return true;
    }
    if (!disabledCleanUp && isAllEnabled) {
      return false;
    }
    return selectedRowKeys.length === 0;
  };

  const onToggle = () => {
    const updatedAllEnabled = !isAllEnabled;
    setAllEnabled(updatedAllEnabled);
  };

  const onDefaultPageChange = (value: SelectValue) => {
    onPageSizeChange(Number(value));
  };

  return (
    <div className={styles.product_cleanup_list_table_wrapper}>
      <div className={styles.product_cleanup_info_actions}>
        <ConfirmationCentered
          title={isAllSelected() ? 'Merge all results' : 'Merge these products'}
          name={isAllSelected() ? '' : selectedNames}
          visible={mergeModalVisible}
          onAction={onMerge}
          setVisible={setMergeModalVisible}
        />
        <Button
          onClick={() => setMergeModalVisible(true)}
          className={styles.product_cleanup_info_action_button}
          disabled={onDisabled()}
        >
          Merge
        </Button>
        <ConfirmationCentered
          title={isAllSelected() ? 'Differentiate all results' : 'Differentiate these products'}
          name={isAllSelected() ? '' : selectedNames}
          visible={differentiateModalVisible}
          onAction={onDifferentiate}
          setVisible={setDifferentiateModalVisible}
        />
        <Button
          onClick={() => setDifferentiateModalVisible(true)}
          className={styles.product_cleanup_info_action_button}
          disabled={onDisabled()}
        >
          Differentiate
        </Button>
        <span
          className={isAllDisabled ? styles.product_cleanup_all_disabled : ''}
          title={isAllDisabled ? 'Unselect products to enable All' : ''}
        >
          <span className={styles.all_filter}>
            <span className={styles.all_filter_label} onClick={onToggle}>
              All
            </span>
            {isAllEnabled ? (
              <FontAwesomeIcon icon={faToggleOnIcon} className={styles.status_active_icon} onClick={onToggle} size="lg" />
            ) : (
              <FontAwesomeIcon
                onClick={onToggle}
                icon={faToggleOffIcon}
                className={styles.status_inactive_icon}
                size="lg"
              />
            )}
          </span>
        </span>
      </div>
      <Spin spinning={loading}>
        <Table
          rowClassName={(record: any, rowIndex): string => {
            const productHoverClass =
              hoverIndex % 2 === 0
                ? rowIndex === hoverIndex
                  ? styles.hover_row
                  : ''
                : rowIndex === hoverIndex - 1
                ? styles.hover_row
                : '';
            const duplicateHoverClass =
              hoverIndex % 2 !== 0
                ? rowIndex === hoverIndex
                  ? styles.hover_row
                  : ''
                : rowIndex === hoverIndex + 1
                ? styles.hover_row
                : '';

            return record.isDuplicate
              ? `${styles.product_cleanup_list_table_row} ${productHoverClass}`
              : `${styles.product_cleanup_duplicate_row} ${duplicateHoverClass}`;
          }}
          className={styles.product_cleanup_list_table}
          rowKey={(_, index: number): string => index.toString()}
          columns={columns}
          pagination={pagination}
          dataSource={items}
          onChange={handlerSortingColumn}
          tableLayout={'auto'}
          locale={{ emptyText: emptyText }}
          rowSelection={rowSelection}
          onRow={(_, rowIndex) => {
            return {
              onMouseEnter: () => {
                setHoverIndex(rowIndex);
              },
              onMouseLeave: () => {
                setHoverIndex(undefined);
              },
            };
          }}
        />
        {items.length > 0 && (
          <Select
            className={styles.product_cleanup_pagination}
            onChange={onDefaultPageChange}
            value={pageSize.toString()}
          >
            {paginationOptions.map(
              (option: any, i: number): React.ReactNode => {
                return (
                  <Option value={option.id} key={`industry-${option.name}-${i}`}>
                    {option.name}
                  </Option>
                );
              }
            )}
          </Select>
        )}
      </Spin>
    </div>
  );
};

export default ProductCleanupListTable;
