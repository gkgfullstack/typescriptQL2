import React from 'react';

import styles from './SettingsSubMenu.module.less';
import { Link } from 'react-router-dom';
import routes from 'src/routes';

const HelpSubMenu: React.FC<{}> = () => {
  
  return (
    <ul className={styles.user_menu}>
      <li className={styles.user_info}>
      <Link to={routes.settings}>Settings</Link>
      </li>
      <li className={styles.logout_link}>
      <Link to={routes.settings}>Change Password</Link>
      </li>
      <li className={styles.logout_link}>
      <Link to={routes.settings}>Site Notifications</Link>
      </li>
      <li className={styles.logout_link}>
      <Link to={routes.settings}>Users</Link>
      </li>
    </ul>
  );
};

export default HelpSubMenu;
