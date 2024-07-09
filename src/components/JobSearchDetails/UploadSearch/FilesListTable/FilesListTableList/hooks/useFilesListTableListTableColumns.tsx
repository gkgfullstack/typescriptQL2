import React, { useEffect, useState } from 'react';
import { ColumnProps } from 'antd/lib/table';
import { Sorting } from 'src/types/Sorting';
import UploadColumns from 'src/api/searchDetails';
import styles from '../FilesListTableList.module.less';
import { Tooltip } from 'antd';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { Button } from 'antd';
//import routes from 'src/routes';

interface ColumnConfig extends ColumnProps<UploadColumns> {
  customColRenderer?: (dataIndex: UploadColumns) => React.ReactNode;
}
// const sortOrder = (sortedInfo: Sorting<RCSearchsType> | null, key: keyof RCSearchsType): SortOrder | boolean => {
//   return sortedInfo && sortedInfo.field === key ? sortedInfo.order : false;
// };
  
export const getColumns = (): ColumnConfig[] => {
  const columns: ColumnConfig[] = [
    {
      title: 'Column',
      key: 'id',
      dataIndex: 'id',
      // render: columnsname,
      defaultSortOrder: 'ascend',
     // sortDirections: ['ascend', 'descend', 'ascend'],
      className: styles.status_column,
      //sortOrder: sortOrder(sorting, 'jobName'),
     // sorter: true,
      width: 80,
    },
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
      //render: createdRender,
     // defaultSortOrder: 'ascend',
     // sortDirections: ['ascend', 'descend', 'ascend'],
      className: styles.status_column,
      //sortOrder: sortOrder(sorting, 'jobName'),
      //sorter: true,
      width: 120,
	  render: name => (
        <Tooltip placement="topLeft" title={name}>
          {name}
        </Tooltip>
      ),
    },
    {
      title: 'Description',
      key: 'description',
      dataIndex: 'description',
      width: 700,
     // ellipsis:true,
      render: address => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
  
     // render: nameRender ,
      //sorter: true,
      //defaultSortOrder: 'ascend',
      //sortDirections: ['ascend', 'descend', 'ascend'],
      //sortOrder: sortOrder(sorting, 'completeTime'),
    },
    
  ];
  return columns;
  
};

const useFilesListTableListTableColumns = (sorting: Sorting<UploadColumns>): [ColumnConfig[]] => {
  const [columns, setColumns] = useState<ColumnConfig[]>([]);
 
  useEffect(() => {
    if (sorting) {
      setColumns(getColumns());
    }
  }, [sorting]);
  return [columns];
  
};

export default useFilesListTableListTableColumns;
