import React from 'react';
import TablePageView from './TablePageView';
import styles from './TablePage.module.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs, faUnlockAlt, faUserCircle, faInfoCircle, faTable } from 'src/setupIcons';
import { Tabs } from 'antd';
import { useHistory } from 'react-router';

const { TabPane } = Tabs;

type TablePageProps = {};

const TablePage: React.FC<TablePageProps> = () => {
    const history = useHistory();
    const [activeKey, setActiveKey] = React.useState<any>('account-settings');
    const location = window.location.pathname ? window.location.pathname : '/settings/account-settings';

    React.useEffect(() => {
        if (location === '' || location === '/tablePage') {
            history.push({
                pathname: `/settings/tablePage`,
            });
        }
        setActiveKey(location);
    }, [location, history]);

    const callback = (key: any) => {
        history.push({
            pathname: key,
        });
    };
    return <div className={styles.product_summary}>
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
                <TablePageView/>
            </span>
        </div>
    </div>;
};

export default TablePage;
