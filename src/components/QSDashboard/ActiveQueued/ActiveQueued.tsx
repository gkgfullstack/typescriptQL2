import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useActiveQueuedFetch} from './Hooks';
import { Alert, Icon, Spin, Popover } from 'antd';
import styles from './ActiveQueued.module.less';
//import Widget from 'src/components/common/Widget/Widget';

type DashboardSelectionProps = {
  Active_Queued?: string;
  Active_Running?: string;
};

const antIcon = <Icon type="loading" spin />;
const exclamationPopoverContent = (
  <div className={styles.topInfoBox}>
    A count of runs currently in a 'Queued' state for the logged in user.
  </div>
);
const exclamationPopoverContent2 = (
  <div className={styles.topInfoBox}>
    A count of runs in an 'Executing' state for the logged in user.
  </div>
);

const ActiveQueued: React.FC<DashboardSelectionProps> = () => {
  const [{ data: ActiveQ, loading: loadingActive, error: activeError }] = useActiveQueuedFetch();
 
  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '0px' }} >
        <div style={{ textAlign: 'center', borderRight: '1px solid #C4C4C4', marginBottom: '0px', float: 'left', width: '50%' }} >
          <Popover content={exclamationPopoverContent} trigger={'hover'} placement="top">
            <FontAwesomeIcon icon={['fal', 'info-circle']} className={styles.infoicons} />
          </Popover>
          <h2>Active Queued</h2>          
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
            <h1 className="h1-data">
            {ActiveQ !== null && (ActiveQ.Active_Queued ? ActiveQ.Active_Queued : '0'               
            )}
            {ActiveQ !== null}
          </h1>
        </div>
        <div style={{ textAlign: 'center', borderRight: '1px solid #C4C4C4', marginBottom: '0px', float: 'left', width: '50%' }} >
          <Popover content={exclamationPopoverContent2} trigger={'hover'} placement="top">
            <FontAwesomeIcon icon={['fal', 'info-circle']} className={styles.infoicons} />
          </Popover>
          <h2>Active Running</h2>
         
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
             <h1 className="h1-data">
            {ActiveQ !== null && (
              ActiveQ.Active_Running ? ActiveQ.Active_Running : '0' 
            )}
            {ActiveQ !== null}
          </h1>

        </div>
      </div>

    </div>
  )

};

export default ActiveQueued;
