import { ColumnProps, SortOrder } from 'antd/lib/table';
import Schedule from 'src/types/Schedule';
import React, { useEffect, useState } from 'react';
import { Sorting } from 'src/types/Sorting';
import RemoveScheduleButton from 'src/components/JobSearchDetails/RemoveScheduleButton';

import styles from '../ScheduleTable.module.less';


export interface ColumnConfig extends ColumnProps<Schedule> {
  customColRenderer?: (record: Schedule, index: number) => React.ReactNode;
}

const sortOrder = (sortedInfo: Sorting<Schedule> | null, key: keyof Schedule): SortOrder | boolean => {
  return sortedInfo && sortedInfo.field === key ? sortedInfo.order : false;
};

const actionRender = (record: Schedule): React.ReactNode => (
  <>
    
    <RemoveScheduleButton className={styles.action_item} scheduleItem={record} tooltipPlacement={'left'} />
  </>
);
const getColumns = (sorting: Sorting<Schedule>): ColumnConfig[] => {
  let columns: ColumnConfig[] = [
   {
      title: '',
      dataIndex: 'description',
      key: 'description',
      sortOrder: sortOrder(sorting, 'description'),
      //sorter: true,
      sortDirections: ['descend', 'ascend'],
      //customColRenderer:descriptionRender
      className: styles.actions_column,
    },
    {
      align: 'center',
      title: '',
      key: 'actions',
      customColRenderer: actionRender,
      className: styles.actions_column,
      width: 20,
    },
  ];
  columns = columns.map(
    (column: ColumnConfig): ColumnConfig => {
      if (column.customColRenderer) {
        const renderer = column.customColRenderer;
        column.render = (_: string | number, record: Schedule, index: number): React.ReactNode => {
          return renderer(record, index);
        };
      }

      return column;
    }
  );

  return columns;
 
};

const useSearchDetailsTableColumns = (sorting: Sorting<Schedule>): [ColumnConfig[]] => {
  const [columns, setColumns] = useState<ColumnConfig[]>([]);

  useEffect(() => {
    if (sorting) {
      setColumns(getColumns(sorting));
    }
  }, [sorting]);

  return [columns];
};

export default useSearchDetailsTableColumns;
