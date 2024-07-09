import React from 'react';
import styles from './SettingsPage.module.less';
import { Tabs } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCogs,
  faUnlockAlt,
  faInfoCircle,
  faUserCircle,
  faTable
} from 'src/setupIcons';
import { useHistory } from 'react-router';

const { TabPane } = Tabs;

type SupportFormProps = {};
const SettingsPage: React.FC<SupportFormProps> = () => {
  const history = useHistory();
  const [activeKey, setActiveKey] = React.useState<any>('setting');
  const location = window.location.pathname ? window.location.pathname : '/settings';
 
  React.useEffect(() => {
    if (location === '' || location === '/settings') {
      history.push({
        pathname: `/settings`,
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
      <Tabs activeKey={activeKey} className={styles.ops_center_tabs} onChange={callback}>
        <TabPane tab={<><FontAwesomeIcon icon={faCogs} /><span>Settings</span> </>} key="/settings/account-settings"></TabPane>
        <TabPane tab={<><FontAwesomeIcon icon={faUnlockAlt} /><span>Change Password</span> </>} key="/settings/change-password"></TabPane>
        <TabPane tab={<><FontAwesomeIcon icon={faTable} /><span>Table</span> </>} key="/settings/tablePage"></TabPane>
        <TabPane tab={<><FontAwesomeIcon icon={faInfoCircle} /><span>Site Notifications</span> </>} key="/settings/site-notifications"></TabPane>
        <TabPane tab={<><FontAwesomeIcon icon={faUserCircle} /><span>Accounts</span> </>} key="/settings/accounts"></TabPane>
      </Tabs>
    </div>


  );
};

export default SettingsPage;
