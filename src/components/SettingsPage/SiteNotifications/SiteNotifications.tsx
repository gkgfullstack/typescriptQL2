import React from 'react';
import SiteNotificationsForm from './SiteNotificationsForm';
import styles from './SiteNotifications.module.less';
import { useSiteNotificationsPostFetch } from '../hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faCogs, faUnlockAlt, faUserCircle, faTable } from 'src/setupIcons';
import { useHistory } from 'react-router';
import { Tabs } from 'antd';
const { TabPane } = Tabs;

type SupportFormProps = {};
const SiteNotifications: React.FC<SupportFormProps> = () => {
  const history = useHistory();
  const [activeKey, setActiveKey] = React.useState<any>('site-notifications');
  const location = window.location.pathname ? window.location.pathname : '/settings/site-notifications';
  const [{ data, loading, error }, { SiteNotificationData }]: any = useSiteNotificationsPostFetch();
  
  const responseLoaded = !loading && (data && SiteNotificationData || error);
  console.log(responseLoaded)
  const addUpdateNameSetting = (values: any) => {
    if (SiteNotificationData && values) {
      SiteNotificationData(values);
    }
  };

  React.useEffect(() => {
    if (location === '' || location === '/settings') {
      history.push({
        pathname: `/settings/site-notifications`,
      });
    }
    setActiveKey(location);
  }, [location]);

  const callback = (key: any) => {
    history.push({
      pathname: key,
    });
  };
  return (
    <div className={styles.product_summary}>
      <div className={styles.ops_center_tabs}>
      <Tabs activeKey={activeKey} className={styles.ops_center_tabs} onChange={callback}>
      <TabPane tab={<><FontAwesomeIcon icon={faCogs} /><span>Settings</span> </>} key="/settings/account-settings"></TabPane>
          <TabPane tab={<><FontAwesomeIcon icon={faUnlockAlt} /><span>Change Password</span> </>} key="/settings/change-password"></TabPane>
          <TabPane tab={<><FontAwesomeIcon icon={faTable} /><span>Table</span> </>} key="/settings/tablePage"></TabPane>
          <TabPane tab={<><FontAwesomeIcon icon={faInfoCircle} /><span>Site Notifications</span> </>} key="/settings/site-notifications"></TabPane>
          <TabPane tab={<><FontAwesomeIcon icon={faUserCircle} /><span>Accounts</span> </>} key="/settings/accounts"></TabPane>
          <TabPane tab={<><FontAwesomeIcon icon={faCogs} /> <span>Competitive Sets</span></>} key="/settings/competitive-sets"></TabPane>
            </Tabs>
        <span className={styles.actions_container}>
          <SiteNotificationsForm onUpdate={addUpdateNameSetting}  />
        </span>
      </div>
    </div>

  );
};

export default SiteNotifications;
