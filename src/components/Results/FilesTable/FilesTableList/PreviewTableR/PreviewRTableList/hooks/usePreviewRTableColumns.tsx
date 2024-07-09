import React, { useEffect, useState } from 'react';
import { ColumnProps, SortOrder } from 'antd/lib/table';
import { Sorting } from 'src/types/Sorting';
import RTLPreviewType from 'src/types/RTLPreviewType';
import styles from '../PreviewRTableList.module.less';


interface ColumnConfig extends ColumnProps<RTLPreviewType> {
  customColRenderer?: (dataIndex: RTLPreviewType) => React.ReactNode;
}
const sortOrder = (sortedInfo: Sorting<RTLPreviewType> | null, key: keyof RTLPreviewType): SortOrder | boolean => {
  return sortedInfo && sortedInfo.field === key ? sortedInfo.order : false;
};

const getColumnss = (sorting: Sorting<RTLPreviewType>, columnsg:any): ColumnConfig[] => {
  let columnss: ColumnConfig[] = [];
   for (var i = 0; i <= columnsg.length; i++) {
    columnss.push(
      {
        title: columnsg[i],
        key: columnsg[i],
        dataIndex: columnsg[i],
        defaultSortOrder: 'descend',
        sortDirections: ['ascend', 'descend', 'ascend'],
        className: styles.status_column,
        sortOrder: sortOrder(sorting, columnsg[i]),
        sorter: true,
        width: 180
      }

    );
  }
  return columnss;
};  

const usePreviewRTableColumns = (sorting: Sorting<RTLPreviewType>, columnsg:string): [ColumnConfig[]] => {
  const [columnss, setColumnss] = useState<ColumnConfig[]>([]);
  useEffect(() => {
    if (sorting) {
      setColumnss(getColumnss(sorting, columnsg));
    }
  }, [sorting, columnsg]);
  return [columnss];

};

export default usePreviewRTableColumns;
