import React, { useEffect, useState } from 'react';
import { ColumnProps, SortOrder } from 'antd/lib/table';
import { Sorting } from 'src/types/Sorting';
import TableResultlistType from 'src/types/TableResultlistType';
import styles from '../ResultsTableList.module.less';
import { Link } from 'react-router-dom';

interface ColumnConfig extends ColumnProps<TableResultlistType> {
  customColRenderer?: (dataIndex: TableResultlistType) => React.ReactNode;
}
const sortOrder = (sortedInfo: Sorting<TableResultlistType> | null, key: keyof TableResultlistType): SortOrder | boolean => {
  return sortedInfo && sortedInfo.field === key ? sortedInfo.order : false;
};

const nameRender =  (text: { jobName: string; runId: string; finishedDate: string}) => (
    <div className={styles.namesection}>
      <Link to={`/datascout/results`} title={text.jobName} referrerPolicy={'origin'}>
        {text.jobName}
      </Link>
      <div>ID: {text.runId}</div>
     <div>Finished: {text.finishedDate}</div>
     </div>
 );     
 const createdRender =  (text: { qualityPercentage: string; }) => (
   <div className={styles.finishsection}>
   <span>{text.qualityPercentage}</span>
   </div>
 );
  
export const getColumns = (sorting: Sorting<TableResultlistType>): ColumnConfig[] => {
  const columns: ColumnConfig[] = [
    {
      key: 'jobName',
      render: nameRender,
      defaultSortOrder: 'descend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      className: styles.status_column,
      width: 340,
    },
    {
      title: 'Sort: Finished',
      key: 'qualityPercentage',
      width: 70,
      render: createdRender,
      sorter: true,
      defaultSortOrder: 'descend',
      sortDirections: ['descend', 'ascend', 'descend'],
      sortOrder: sortOrder(sorting, 'qualityPercentage'),
    },
    
  ];
  return columns;
  
};

const useResultsTableListTableColumns = (sorting: Sorting<TableResultlistType>): [ColumnConfig[]] => {
  const [columns, setColumns] = useState<ColumnConfig[]>([]);
 
  useEffect(() => {
    if (sorting) {
      setColumns(getColumns(sorting));
    }
  }, [sorting]);
  return [columns];
  
};

export default useResultsTableListTableColumns;
