import React, { useState } from 'react';
import { Button, Table } from 'antd';
import ProductMatchInfo from 'src/types/ProductMatcheInfo';
import { PaginationConfig, SorterResult } from 'antd/lib/table';
import { useMatchDetailsTableColumns } from './hooks';
import { Sorting } from 'src/types/Sorting';
import Spin from 'src/components/common/Spin';
import styles from './MatchDetailsTable.module.less';
import clsx from 'clsx';
import BenchmarkMatchButton from 'src/components/ProductDetails/BenchmarkMatchButton';
import RemoveMatchButton from 'src/components/ProductDetails/RemoveMatchButton';
import UnBenchmarkMatchButton from 'src/components/ProductDetails/UnBenchmarkMatchButton';
import useQueryUrlParams from 'src/hooks/useQueryUrlParams';

export type MatchDetailsTableProps = {
  sorting: Sorting<ProductMatchInfo>;
  items: ProductMatchInfo[] | null;
  totalItems: number;
  loading: boolean;
  itemsPerPage: number;
  getMoreItems: (count: number) => void;
  onSortingChange: (sorting: Sorting<ProductMatchInfo>) => void;
  permissions: { [key: string]: boolean };
};

export interface SelectionCheckboxAllState {
  checked?: boolean;
  indeterminate?: boolean;
}

const MatchDetailsTable: React.FC<MatchDetailsTableProps> = ({
  loading,
  sorting,
  totalItems,
  itemsPerPage,
  items,
  getMoreItems,
  onSortingChange,
  permissions,
}: MatchDetailsTableProps) => {
  const handleTableChanges = (
    _: PaginationConfig,
    __: Partial<Record<keyof ProductMatchInfo, string[]>>,
    sorter: SorterResult<ProductMatchInfo>
  ): void => {
    const order =
      sorting.field === sorter.columnKey && sorter.order === undefined
        ? sorting.order === 'ascend'
          ? 'descend'
          : 'ascend'
        : sorter.order;

    onSortingChange({ field: sorter.columnKey, order: order });
  };
  const { priceType } = useQueryUrlParams();
  const priceTypeIdsUpdate: string = priceType !== undefined ? priceType : '1';
  const [columns] = useMatchDetailsTableColumns(sorting, priceTypeIdsUpdate, permissions);
  const [displayedItems, setDisplayedItems] = useState<ProductMatchInfo[]>([]);
  const [collapsed, setCollapsed] = useState(true);
  const [selectedRowKeyVal, setSelectedRowKeyVal] = useState<ProductMatchInfo[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>();
  const [visible, setVisible] = useState(false);

  React.useEffect(() => {
    if (selectedRowKeys && selectedRowKeys.length > 0) {
      setVisible(false);
      setSelectedRowKeys({
        selectedRowKeys: [],
        loading: false,
      });
    } else {
      setVisible(false);
      setSelectedRowKeys({ loading: false });
    }
  }, [items, setVisible]);

  React.useEffect(() => {
    const displayedItems: ProductMatchInfo[] =
      collapsed && items ? items.slice(0, itemsPerPage) : items ? [...items] : [];
    setDisplayedItems(displayedItems);
    if (selectedRowKeys && selectedRowKeys.length > 0) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [collapsed, itemsPerPage, items, clsx]);

  const showLoadMoreButton = itemsPerPage < totalItems;
  const loadMoreLabel = collapsed ? 'View All Matches' : 'View Less Matches';

  const handleViewMoreButtonClick = () => {
    if (items !== null && items.length < totalItems) {
      getMoreItems(totalItems - items.length);
    }
    setCollapsed(!collapsed);
    setVisible(false);
  };
  React.useEffect(() => {
    if (items !== null && items.length > totalItems) {
      getMoreItems(totalItems - items.length);
    }
    setVisible(false);
  }, [items, totalItems]);

  function unchecked() {
    if (items !== null && items.length < totalItems) {
      setSelectedRowKeys({ loading: true });
      setVisible(false);
      setTimeout(() => {
        setSelectedRowKeys({
          selectedRowKeys: [],
          loading: false,
        });
      }, 1000);
    }
  }

  function onSelectedRowKeysChange(selectedRowKeys: any, selectedRows: ProductMatchInfo[]) {
    setSelectedRowKeys(selectedRowKeys);
    if (selectedRows.length <= 0) {
      setVisible(false);
    } else {
      setVisible(true);
    }
    const selectedRowsNew: ProductMatchInfo[] = [];
    for (let i = 0; i < selectedRows.length; i++) {
      if (selectedRows[i].removeRequest === false) {
        selectedRowsNew.push(selectedRows[i]);
        setVisible(true);
      }
    }
    setSelectedRowKeyVal(selectedRows);
  }

  const rowSelection = {
    ...selectedRowKeys,
    onChange: onSelectedRowKeysChange,
    getCheckboxProps: (record: ProductMatchInfo) => ({
      disabled: record.removeRequest === true,
      removeRequest: record.removeRequest,
    }),
    setRowClass: (record: ProductMatchInfo): React.ReactNode => {
      if (record.removeRequest === true) {
        return clsx([styles.disabled_row]);
      } else if (record.benchmarkMatch === '1') {
        if (clsx([styles.unbanchmark_row])) {
          return clsx([styles.banchmark_row]);
        }
      } else if (record.benchmarkMatch === '0') {
        if (clsx([styles.banchmark_row])) {
          return clsx([styles.unbanchmark_row]);
        }
      } else {
        return clsx([styles.unbanchmark_row]);
      }
    },
  };

  return (
    <Spin spinning={loading}>
      <div className={styles.table_container}>
        <div className={styles.bookmarkAdded}>
          {visible && (
            <>
              {!permissions.isReadOnlyBenchmark && (
                <BenchmarkMatchButton
                  className={styles.action_item}
                  tooltipPlacement={'left'}
                  matchItems={selectedRowKeyVal}
                  key={`index2_${selectedRowKeyVal?.length}`}
                  selectedRowsss={unchecked}
                />
              )}
              {!permissions.isReadOnlyMatch && (
                <RemoveMatchButton
                  className={styles.action_item}
                  matchItems={selectedRowKeyVal}
                  tooltipPlacement={'left'}
                  key={`index_${selectedRowKeyVal?.length}`}
                  selectedRowsss={unchecked}
                />
              )}
              {!permissions.isReadOnlyBenchmark && (
                <UnBenchmarkMatchButton
                  className={styles.action_item}
                  matchItems={selectedRowKeyVal}
                  tooltipPlacement={'left'}
                  key={`index3_${selectedRowKeyVal?.length}`}
                  selectedRowsss={unchecked}
                />
              )}
            </>
          )}
        </div>

        <Table
          className={styles.table}
          tableLayout={'fixed'}
          columns={columns}
          rowKey={'productId'}
          rowClassName={rowSelection.setRowClass}
          dataSource={displayedItems || []}
          pagination={false}
          onChange={handleTableChanges}
          rowSelection={rowSelection}
        />

        {showLoadMoreButton && (
          <div className={styles.buttons_bar}>
            <Button type={'link'} onClick={handleViewMoreButtonClick}>
              {loadMoreLabel}
            </Button>
          </div>
        )}
      </div>
    </Spin>
  );
};

export default MatchDetailsTable;
