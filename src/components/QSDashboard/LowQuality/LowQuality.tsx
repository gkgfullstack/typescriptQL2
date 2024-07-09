import React from 'react';
import { Alert, Icon, Spin, Popover  } from 'antd';
import {useLowQualityFetch} from './Hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './LowQuality.module.less';

type LowQualityProps = {
  lowQuality?:string;
};
const antIcon = <Icon type="loading" spin />;
const exclamationPopoverContent = (
    <div className={styles.topInfoBox}>
   A count of runs completed in the past 24 hours that could not successfully collect at least 10% of data requested.
      
    </div>
  );
  
const LowQuality: React.FC<LowQualityProps> = () => {
  const [{ data: ActiveQ, loading: loadingActive, error: activeError }] = useLowQualityFetch();
 
   return <div style={{ textAlign: 'center', marginBottom: '0px' }} >   
   <div style={{ textAlign: 'center', borderRight: '1px solid #C4C4C4', marginBottom: '0px' }} >  
   <Popover content={exclamationPopoverContent} trigger={'hover'} placement="top">
     <FontAwesomeIcon icon={['fal', 'info-circle']} className={styles.infoicons} />
     </Popover>
      <h2>Low Quality</h2>
         
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
            {ActiveQ !== null && ( ActiveQ.lowQuality)}
            {ActiveQ !== null}
          </h1>

</div>

   </div>;
 
};

export default LowQuality;
