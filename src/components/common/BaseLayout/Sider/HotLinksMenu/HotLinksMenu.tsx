import React from 'react';
import { Menu } from 'antd';
import clsx from 'clsx';
import SiderMenuItem from '../SiderMenuItem';
import styles from './HotLinksMenu.module.less';
import { useHotLinksMenu } from './hooks';
import UserInfo from 'src/types/UserInfo';
import { SiderMenuNode } from './hooks/useHotLinksMenu';
import { ClickParam } from 'antd/lib/menu';
import AdminMode from './AdminMode';

const handleClick = (config: SiderMenuNode[]): ((a: ClickParam) => void) => (a: ClickParam): void => {
  const node = config.find((node: SiderMenuNode) => a.key === node.key);
  if (node && node.onClick) {
    node.onClick();
  }
};

type SiderMenuProps = {
  pathName: string;
  className: string;
  alertsCount: number;
  user: UserInfo | null;
  collapsed?: boolean;
};

const HotLinksMenu: React.FC<SiderMenuProps> = ({
  pathName,
  alertsCount,
  user,
  className,
  collapsed,
}: SiderMenuProps) => {
  const [config, selectedKeys] = useHotLinksMenu(pathName, alertsCount, user);
  const ref = React.createRef<HTMLDivElement>();
  const hasAppAdminPriv: any = localStorage.getItem('hasAppAdminPriv');
  return (
    <div ref={ref}>
      <Menu
        theme="light"
        mode="inline"
        className={clsx(styles.hot_links_menu, className)}
        selectedKeys={selectedKeys}
        onClick={handleClick(config)}
      >
        {config.map((menuItem: SiderMenuNode) => {
          return (
            <SiderMenuItem
              {...menuItem}
              key={menuItem.key}
              className={clsx(styles.menu_item, className)}
              iconClassName={styles.menu_item_icon}
              labelClassName={styles.menu_item_label}
              containerRef={ref}
            />
          );
        })}
        <span style={{ paddingLeft: '24px', whiteSpace: 'nowrap' }}>
          {hasAppAdminPriv === 'true' && (
            <>
              <AdminMode />
              {!collapsed && (
                <span className={clsx(styles.menu_item, className)} style={{ paddingLeft: '10px' }}>
                  Admin Mode
                </span>
              )}{' '}
            </>
          )}
        </span>
      </Menu>
    </div>
  );
};

export default HotLinksMenu;
