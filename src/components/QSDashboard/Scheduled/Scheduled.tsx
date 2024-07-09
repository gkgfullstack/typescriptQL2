import React from 'react';
import { Alert, Icon, Spin, Popover } from 'antd';
import {useScheduledFetch} from './Hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Scheduled.module.less';

type ScheduledProps = {
  scheduled?:string;
};
const exclamationPopoverContent = (
    <div className={styles.topInfoBox}>
   A count of runs scheduled to start in the next 24 hours.
      
    </div>
  );
  const antIcon = <Icon type="loading" spin />;
const Scheduled: React.FC<ScheduledProps> = () => {
  const [{ data: ActiveQ, loading: loadingActive, error: activeError }] = useScheduledFetch();
  
   return <div style={{ textAlign: 'center', marginBottom: '0px' }} >   
   <div style={{ textAlign: 'center', marginBottom: '0px' }} >  
   <Popover content={exclamationPopoverContent} trigger={'hover'} placement="top">
     <FontAwesomeIcon icon={['fal', 'info-circle']} className={styles.infoicons} />
     </Popover>
            <h2>Scheduled</h2>
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
            {ActiveQ !== null && (ActiveQ.scheduled)}
            {ActiveQ !== null}
          </h1>
        </div>
   </div>;
};

export default Scheduled;
