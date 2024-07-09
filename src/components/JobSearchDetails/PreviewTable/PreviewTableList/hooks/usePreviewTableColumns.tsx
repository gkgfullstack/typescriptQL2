import React, { useEffect, useState } from 'react';
import { ColumnProps, SortOrder } from 'antd/lib/table';
import { Sorting } from 'src/types/Sorting';
import PreviewTypeVIew from 'src/types/PreviewTypeVIew';
import styles from '../PreviewTableList.module.less';


interface ColumnConfig extends ColumnProps<PreviewTypeVIew> {
  customColRenderer?: (dataIndex: PreviewTypeVIew) => React.ReactNode;
}
const sortOrder = (sortedInfo: Sorting<PreviewTypeVIew> | null, key: keyof PreviewTypeVIew): SortOrder | boolean => {
  return sortedInfo && sortedInfo.field === key ? sortedInfo.order : false;
};

const getColumnss = (sorting: Sorting<PreviewTypeVIew>, columnsg:any): ColumnConfig[] => {
  let columnss: ColumnConfig[] = [];
   for (var i = 0; i < columnsg.length; i++) {
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

const usePreviewTableColumns = (sorting: Sorting<PreviewTypeVIew>, columnsg:string): [ColumnConfig[]] => {
  const [columnss, setColumnss] = useState<ColumnConfig[]>([]);
  useEffect(() => {
    if (sorting) {
      setColumnss(getColumnss(sorting, columnsg));
    }
  }, [sorting, columnsg]);
  return [columnss];

};

export default usePreviewTableColumns;
