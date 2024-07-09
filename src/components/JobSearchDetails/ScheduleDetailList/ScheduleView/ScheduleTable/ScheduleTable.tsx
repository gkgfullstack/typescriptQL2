import React, { useState } from 'react';
import { Table } from 'antd';
import { PaginationConfig, SorterResult } from 'antd/lib/table';
import { useScheduleTableColumns } from './hooks';
import { Sorting } from 'src/types/Sorting';
import Spin from 'src/components/common/Spin';

import styles from './ScheduleTable.module.less';
import Schedule from 'src/types/Schedule';

export type ScheduleTableProps = {
  sorting: Sorting<Schedule>;
  items: Schedule[] | undefined;
  loading: boolean;
  itemsPerPage?: number;
  onSortingChange: (sorting: Sorting<Schedule>) => void;
};

const ScheduleTable: React.FC<ScheduleTableProps> = ({
  loading,
  sorting,
  items,
  onSortingChange,
}: ScheduleTableProps) => {
  const handleTableChanges = (
    _: PaginationConfig,
    __: Partial<Record<keyof Schedule, string[]>>,
    sorter: SorterResult<Schedule>
  ): void => {
    const order =
      sorting.field === sorter.columnKey && sorter.order === undefined
        ? sorting.order === 'ascend'
          ? 'descend'
          : 'ascend'
        : sorter.order;

    onSortingChange({ field: sorter.columnKey, order: order });
  };

  const [columns] = useScheduleTableColumns(sorting);
  const [displayedItems, setDisplayedItems] = useState<Schedule[]>([]);

  React.useEffect(() => {
    const displayedItems: Schedule[] = items ? [...items] : [];
    setDisplayedItems(displayedItems);
  }, [items]);
  const emptyText: React.ReactNode = <p className="no_results">This job does not have a schedule</p>;

  return (
    <Spin spinning={loading}>
      <div className={styles.table_container}>
        <Table
          className={styles.table}
          tableLayout={'fixed'}
          columns={columns}
          rowKey={(_, index: number): string => `product-id-${index.toString()}`}
          //rowClassName={setRowClass}
          locale={{ emptyText: emptyText }}
          dataSource={displayedItems}
          pagination={false}
          onChange={handleTableChanges}
        />
      </div>
    </Spin>
  );
};

export default ScheduleTable;
