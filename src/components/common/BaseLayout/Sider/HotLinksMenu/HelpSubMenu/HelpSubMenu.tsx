import React, { useState } from 'react';
import styles from './HelpSubMenu.module.less';
import SupportPageDrawer from 'src/components/common/SupportPageDrawer';

const HelpSubMenu: React.FC<{}> = () => {
  const [visibleSupport, setVisibleSupport] = useState(false);

  return (
    <ul className={styles.user_menu}>
      <li className={styles.user_info}>
        <span className={styles.technical_support_link} onClick={() => setVisibleSupport(true)}>
          Technical Support
        </span>
        <SupportPageDrawer visible={visibleSupport} setVisible={setVisibleSupport} />
      </li>
      <li className={styles.logout_link}>
        <a href="https://www.ql2.com/knowledge-base/" target="_blank">Knowledge Base</a>
      </li>
    </ul>
  );
};

export default HelpSubMenu;
