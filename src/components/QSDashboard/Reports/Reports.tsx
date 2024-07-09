import React from 'react';
import {useReportsFetch} from './Hooks';
import { Alert, Icon, Spin } from 'antd';
 import styles from './Reports.module.less';

type ReportsProps = {};

const antIcon = <Icon type="loading" spin />;
const Reports: React.FC<ReportsProps> = () => {
  const [{ data: ActiveQ, loading: loadingActive, error: activeError }] = useReportsFetch();
  
   return <div>
   <div style={{width:'calc(45% - 0px)', margin: '0px 0 0 0px', display: 'inline-block', borderRight: '1px solid #c4c4c4'}}>
   <h2>Total Inputs</h2>
   <div>
   {activeError && (
              <Alert
                message="Error"
                description="An error, Please try again later!"
                type="error"
                showIcon
              />
            )}
            {loadingActive && !activeError ? (
              <div className={styles.matches_loader_container}>
                <Spin indicator={antIcon} size={'large'} spinning={loadingActive} />
              </div>
            ) : null}
            {ActiveQ !== null && (
              <h1>
                {ActiveQ.outputs}
              </h1>
            )}
            {ActiveQ !== null}
   </div>
   {/* <h1 key={posts.inputs}>{posts.inputs}</h1> */}
   </div>
   <div style={{width:'calc(55% - 30px)', margin: '0px 0 0 30px', display: 'inline-block'}}>
   <h2>Total Outputs</h2>
   <div>{activeError && (
              <Alert
                message="Error"
                description="An error, Please try again later!"
                type="error"
                showIcon
              />
            )}
            {loadingActive && !activeError ? (
              <div className={styles.matches_loader_container}>
                <Spin indicator={antIcon} size={'large'} spinning={loadingActive} />
              </div>
            ) : null}
            {ActiveQ !== null && (
              <h1>
                {ActiveQ.inputs}
              </h1>
            )} 
            {ActiveQ !== null}</div>
   </div>
 </div>;
};

export default Reports;
