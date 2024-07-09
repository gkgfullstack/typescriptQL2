import React from 'react';
//import { Popover } from 'antd';
//import { Alert, Icon, Spin } from 'antd';
import { useResultsDetailDeleteFetch } from './Hooks';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import styles from './ResultInput.module.less';
//import ResultProgress from '../ResultProgress';
//import { Link } from 'react-router-dom';
//import TableResultlistType from 'src/types/TableResultlistType';

type ResultDetailDelete = {
  runId:string;
 
};

//const antIcon = <Icon type="loading" spin />;

// const exclamationPopoverContent = (
//   <div className={styles.topInfoBox}>
   

//   </div>
//);

const ResultDetailDelete: React.FC<ResultDetailDelete> = ({runId}:ResultDetailDelete) => {
  const [{  }] = useResultsDetailDeleteFetch(runId);
  
  
  return (<div className="boxResultPage" >
    Hi
  </div>
  )
};

export default ResultDetailDelete;
