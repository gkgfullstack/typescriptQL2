import React, { useEffect, useState } from 'react';
import { ColumnProps } from 'antd/lib/table';
import { Sorting } from 'src/types/Sorting';
import RCSearchsType from 'src/types/RCSearchsType';
//import styles from '../RCSearchsList.module.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
//import routes from 'src/routes';

interface ColumnConfig extends ColumnProps<RCSearchsType> {
  customColRenderer?: (dataIndex: RCSearchsType) => React.ReactNode;
}
// const sortOrder = (sortedInfo: Sorting<RCSearchsType> | null, key: keyof RCSearchsType): SortOrder | boolean => {
//   return sortedInfo && sortedInfo.field === key ? sortedInfo.order : false;
// };
let  bAdminMode:boolean=false;
let input = localStorage.getItem("bAdminMode");
bAdminMode = (input === 'true');
const nameRender =  (text: { jobName: string; runId: string; starred: string; applicationName: string,jobId:string,ownerName:string }) => (
    <div className="namesection"><Link to={`/datascout/search-details/${text.jobId}`} title={text.applicationName} referrerPolicy={'origin'}>
       {text.jobName}
       {text.starred ? <FontAwesomeIcon icon={['fas', 'star']} className="staricons" size="sm" /> : ''}
       </Link>
      
     <div><Link className="nav-link" to={`/datascout/results-details/${text.runId}`} title={"Name " + text.runId} referrerPolicy={'origin'}>Run Id: {text.runId}</Link></div>
     <div>{text.applicationName}&nbsp;&nbsp;{bAdminMode==true?text.ownerName:""}</div>
    </div>
     
     );
     
 const createdRender =  (text: { completeTime: string; totalWorkunit: number; erroredWorkunit: number; errors: string;}) => (
   <div className="finishsection">
   <span>{text.completeTime}</span><br/>
   <span>
     <FontAwesomeIcon icon={['fal', 'hourglass-half']} className="hourglassicon" size="sm" />
     {Math.round(((text.totalWorkunit - text.erroredWorkunit) / text.totalWorkunit) * 100)
       ? Math.round(((text.totalWorkunit - text.erroredWorkunit) / text.totalWorkunit) * 100) + '%'
       : '0'}
   </span>
   <span>
     <FontAwesomeIcon icon={['far', 'exclamation-triangle']} className="erroricon" size="sm" />
     {text.errors}
   </span>
 </div>
 );

  
export const getColumns = (): ColumnConfig[] => {
  const columns: ColumnConfig[] = [
    {
      title: 'Name',
      key: 'name',
      render: nameRender,
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      className: "status_column",
      //sortOrder: sortOrder(sorting, 'jobName'),
      sorter: true,
      width: 400,
    },
    {
      title: 'Finished',
      key: 'Finished',
      width: 150,
      render: createdRender,
      sorter: true,
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      //sortOrder: sortOrder(sorting, 'completeTime'),
    },
    
  ];
  return columns;
  
};

const useRCSearchsListTableColumns = (sorting: Sorting<RCSearchsType>): [ColumnConfig[]] => {
  const [columns, setColumns] = useState<ColumnConfig[]>([]);
 
  useEffect(() => {
    if (sorting) {
      setColumns(getColumns());
    }
  }, [sorting]);
  return [columns];
  
};

export default useRCSearchsListTableColumns;
