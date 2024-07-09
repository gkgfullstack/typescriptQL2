import React, { useState } from 'react';
import { Table } from 'antd';
import SearchDtlListInfo from 'src/types/SearchDtlListInfo';
import { PaginationConfig, SorterResult } from 'antd/lib/table';
import { useSearchDetailsTableColumns } from './hooks';
import { Sorting } from 'src/types/Sorting';
import Spin from 'src/components/common/Spin';

import styles from './SearchDetailsTable.module.less';

export type SearchDetailsTableProps = {
  sorting: Sorting<SearchDtlListInfo>;
  items: SearchDtlListInfo[] | null;
  loading: boolean;
  itemsPerPage?: number;
  onSortingChange: (sorting: Sorting<SearchDtlListInfo>) => void;
};

const SearchDetailsTable: React.FC<SearchDetailsTableProps> = ({
  loading,
  sorting,
  items,
  onSortingChange,
}: SearchDetailsTableProps) => {
  const handleTableChanges = (
    _: PaginationConfig,
    __: Partial<Record<keyof SearchDtlListInfo, string[]>>,
    sorter: SorterResult<SearchDtlListInfo>
  ): void => {
    const order =
      sorting.field === sorter.columnKey && sorter.order === undefined
        ? sorting.order === 'ascend'
          ? 'descend'
          : 'ascend'
        : sorter.order;

    onSortingChange({ field: sorter.columnKey, order: order });
  };

  const [columns] = useSearchDetailsTableColumns(sorting);
  const [displayedItems, setDisplayedItems] = useState<SearchDtlListInfo[]>([]);

  React.useEffect(() => {
    const displayedItems: SearchDtlListInfo[] = items ? [...items] : [];
    setDisplayedItems(displayedItems);
  }, [items]);

  return (
    <Spin spinning={loading}>
      <div className={styles.table_container}>
        <Table
          rowClassName={(): string => styles.product_table_row}
          rowKey={(_, index: number): string => index.toString()}
          className={styles.table}
          columns={columns}
          dataSource={displayedItems}
          pagination={false}
          onChange={handleTableChanges}
          scroll={{ y: 92 }}
        />
      </div>
    </Spin>
  );
};

export default SearchDetailsTable;
