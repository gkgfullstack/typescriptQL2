import React, { useState } from 'react';
import { Layout } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { ReactComponent as QL2Logo } from 'src/styles/ql2/assets/svg/logo.svg';
import { ReactComponent as QL2ClientCenterLogo } from 'src/styles/ql2/assets/svg/company-logo.svg';
import { ReactComponent as QdashLogo } from 'src/styles/qdash/assets/svg/logo.svg';
import { ReactComponent as QdashClientCenterLogo } from 'src/styles/qdash/assets/svg/company-logo.svg';
import { ReactComponent as ExpediaLogo } from 'src/styles/expedia/assets/svg/logo.svg';
import { ReactComponent as ExpediaClientCenterLogo } from 'src/styles/expedia/assets/svg/company-logo.svg';
import PrimaryMenu from './PrimaryMenu';
import HotLinksMenu from './HotLinksMenu';
import Switch from 'src/components/common/Switch';
import styles from './Sider.module.less';
import { useAppStateContext } from 'src/stateProviders/useAppStateContext';
import auth from 'src/services/auth';

const { Sider } = Layout;

type SiderProps = {
  collapsed: boolean;
  onToggleCollapse: () => void;
};

// TODO: once the functuanality is clear, delete this and implement using React props/context/hooks
const propps = {
  isAdminMode: true,
  alertsCount: 2,
  toggleAdminMode: (): void => {},
};

const MySider: React.FC<SiderProps> = ({ collapsed, onToggleCollapse }: SiderProps) => {
  const [isSiderHovered, setSiderHovered] = useState(false);
  const {} = useLocation();
  const location = useLocation();
  let pathnamesearch: any = '';
  pathnamesearch = location.pathname.concat(location.search);
  const { isAdminMode, alertsCount, toggleAdminMode } = propps;
  const { user } = useAppStateContext();

  const onChangeSliderState = () => {
    onToggleCollapse();
    localStorage.setItem('sliderState', JSON.stringify(!collapsed));
  };

  //TODO: remove it after this part will be implemented
  const showAdminMode = false;
  const skinName = auth.getSkin();
  return (
    <Sider
      theme="light"
      collapsed={collapsed}
      id="widget"
      className={clsx(styles.sider, { [styles.sider_collapsed]: collapsed })}
    >
      <div className={clsx(styles.logo_container, { [styles.logo_container_collapsed]: collapsed })}>
        {skinName === 'ql2' ? (
          collapsed ? (
            <QL2Logo />
          ) : (
            <QL2ClientCenterLogo />
          )
        ) : skinName === 'qdash' ? (
          collapsed ? (
            <QdashLogo />
          ) : (
            <QdashClientCenterLogo />
          )
        ) : skinName === 'expretio' ? (
          collapsed ? (
            <QdashLogo />
          ) : (
            <QdashClientCenterLogo />
          )
        ) : skinName === 'expedia' ? (
          collapsed ? (
            <ExpediaLogo />
          ) : (
            <ExpediaClientCenterLogo />
          )
        ) : collapsed ? (
          <QL2Logo />
        ) : (
          <QL2ClientCenterLogo />
        )}
      </div>
      <span className={styles.trigger_container} id="widget" onClick={onChangeSliderState}>
        <FontAwesomeIcon icon={['far', collapsed ? 'chevron-right' : 'chevron-left']} size={'lg'} />
      </span>
      <div
        className={styles.navigation_container}
        onMouseEnter={() => {
          if (collapsed && !isSiderHovered) {
            onToggleCollapse();
            setSiderHovered(true);
          }
        }}
        onMouseLeave={() => {
          if (isSiderHovered) {
            onToggleCollapse();
            setSiderHovered(false);
          }
        }}
      >
        <PrimaryMenu className={clsx(styles.menu, styles.top_menu)} pathName={pathnamesearch} />
        <HotLinksMenu
          className={styles.menu}
          pathName={pathnamesearch}
          user={user || null}
          alertsCount={alertsCount}
          collapsed={collapsed}
        />
        {showAdminMode && (
          <Switch
            label={collapsed ? '' : 'Admin Mode'}
            size="small"
            checked={isAdminMode}
            onChange={toggleAdminMode}
            short={collapsed}
            className={styles.admin_mode_switch}
          />
        )}
        {!showAdminMode && <div className={styles.no_admin_mode} id="widget"></div>}
      </div>
    </Sider>
  );
};

export default MySider;
