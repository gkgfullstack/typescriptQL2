import React from 'react';
import styles from './CompetitiveSets.module.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs, faInfoCircle, faUnlockAlt, faUserCircle, faTable } from 'src/setupIcons';
import { useHistory } from 'react-router';
import { Tabs } from 'antd';
import CompetitiveSetsView from 'src/components/SettingsPage/CompetitiveSets/CompetitiveSetsView';
import routes from 'src/routes';

const { TabPane } = Tabs;
const COMPETITIVE_SET_URL = 'competitive-sets';

type CompetitiveSetsProps = {};

const CompetitiveSets: React.FC<CompetitiveSetsProps> = () => {
  const history = useHistory();
  const [activeKey, setActiveKey] = React.useState<string>(COMPETITIVE_SET_URL);
  const location = window.location.pathname ? window.location.pathname : routes.compSets;

  React.useEffect(() => {
    if (location === '' || location === '/settings') {
      history.push({
        pathname: routes.compSets,
      });
    }
    setActiveKey(location);
  }, [location, history]);

  const callback = (key: any) => {
    history.push({
      pathname: key,
    });
  };
  return (
    <div className={styles.competitive_set_wrapper}>
      <div className={styles.competitive_set_tabs}>
        <Tabs activeKey={activeKey} className={styles.ops_center_tabs} onChange={callback}>
          <TabPane tab={<><FontAwesomeIcon icon={faCogs} /><span>Settings</span> </>} key="/settings/account-settings"></TabPane>
          <TabPane tab={<><FontAwesomeIcon icon={faUnlockAlt} /><span>Change Password</span> </>} key="/settings/change-password"></TabPane>
          <TabPane tab={<><FontAwesomeIcon icon={faTable} /><span>Table</span> </>} key="/settings/tablePage"></TabPane>
          <TabPane tab={<><FontAwesomeIcon icon={faInfoCircle} /><span>Site Notifications</span> </>} key="/settings/site-notifications"></TabPane>
          <TabPane tab={<><FontAwesomeIcon icon={faUserCircle} /><span>Accounts</span> </>} key="/settings/accounts"></TabPane>
          <TabPane tab={<><FontAwesomeIcon icon={faCogs} /> <span>Competitive Sets</span></>} key="/settings/competitive-sets"></TabPane>
        </Tabs>
        <div className={styles.competitive_set_content}>
          <CompetitiveSetsView />
        </div>
      </div>
    </div>
  );
};

export default CompetitiveSets;
