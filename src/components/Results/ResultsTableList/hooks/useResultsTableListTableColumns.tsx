import React, { useEffect, useState } from 'react';
import { ColumnProps, SortOrder } from 'antd/lib/table';
import { Sorting } from 'src/types/Sorting';
import TableResultlistType from 'src/types/TableResultlistType';
import styles from '../ResultsTableList.module.less';
//import { Link } from 'react-router-dom';
import APPLICATIONS_NAME from 'src/enums/applicationsName';

interface ColumnConfig extends ColumnProps<TableResultlistType> {
  customColRenderer?: (dataIndex: TableResultlistType) => React.ReactNode;
}
const sortOrder = (sortedInfo: Sorting<TableResultlistType> | null, key: keyof TableResultlistType): SortOrder | boolean => {
  return sortedInfo && sortedInfo.field === key ? sortedInfo.order : false;
};
let  bAdminMode:boolean=false;
let input = localStorage.getItem("bAdminMode");
bAdminMode = (input === 'true');
const nameRender =  (text: { jobName: string; runId: string; finishedDate: string; applicationName: string;ownerName:string}) => (
    <div className={styles.namesection}>
      <span style={{ cursor:'pointer'}} title={text.jobName}>
        {text.jobName}
      </span>
      <div>ID: {text.runId} 
     {bAdminMode==true?" "+text.ownerName:""}
     </div>
     <div>Finished: {text.finishedDate}</div> 
      
  
     </div>
 );     
 const createdRender =  (text: { qualityPercentage: string; }) => (
  
  
  <div className={styles.finishsection}>
   
   <span>{text.qualityPercentage}</span>
   </div>
 
 );

 const createdRenderApp =  (text: { applicationName: string; }) => (
  
  
  <div className={styles.finishsection}>   
   <p>{APPLICATIONS_NAME[text.applicationName] || text.applicationName}</p>
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
      width: 255,
    },

    {
      title: '',
      key: '',
      width: 120,
      render: createdRenderApp,
      defaultSortOrder: 'descend',
      sortDirections: ['descend', 'ascend', 'descend'],
    },

    {
      title: 'Sort: Finished',
      key: 'Finished',
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
