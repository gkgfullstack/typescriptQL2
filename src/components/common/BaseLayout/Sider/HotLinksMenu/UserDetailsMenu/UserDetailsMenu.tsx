import React from 'react';
import useLogoutFetch from '../hooks/useLogoutFetch';
import auth from 'src/services/auth';
import { useAppStateContext } from 'src/stateProviders/useAppStateContext';
import { Button } from 'antd';

import styles from './UserDetailsMenu.module.less';

const UserDetailsMenu: React.FC<{}> = () => {
  const { user } = useAppStateContext();
  const [{ data, loading }, { logout }] = useLogoutFetch();
  const userName = (user && user.userName) || '';
  React.useEffect(() => {
    //user should be logged out in any case when clicks on logout
    if (data !== null) {
      auth.logout();
    }
  }, [data]);
  return (
    <ul className={styles.user_menu} id="user_menu">
      <li className={styles.user_info}>
        <h4>{userName}</h4>
        <h6>QL2</h6>
      </li>
      <li className={styles.logout_link}>
        <Button type="link" onClick={logout} disabled={loading} className={styles.logout_link}>
          Logout
        </Button>
      </li>
    </ul>
  );
};

export default UserDetailsMenu;
