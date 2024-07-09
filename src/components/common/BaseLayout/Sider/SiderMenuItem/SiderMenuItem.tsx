import React, { CSSProperties, RefObject } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Popover } from 'antd';
import clsx from 'clsx';

import styles from './SiderMenuItem.module.less';

export type SiderMenuItemProps = {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  path?: string;
  className?: string;
  iconStyle?: CSSProperties;
  iconClassName?: string;
  labelClassName?: string;
  children?: React.ReactNode;
  containerRef?: RefObject<HTMLDivElement>;
  customLink?: object;
  customChildren?: object;
};

const SiderMenuItem: React.FC<SiderMenuItemProps> = ({
  children,
  label,
  icon,
  key,
  path,
  className,
  iconStyle,
  iconClassName,
  labelClassName,
  containerRef,
  customLink,
  customChildren,
  ...props
}: SiderMenuItemProps) => {
  const content = (
    <>
      {/* anticon className is needed for menu item tooltips when the menu is collapsed */}
      {icon && (
        <i style={iconStyle} className={clsx('anticon', iconClassName)}>
          {icon}
        </i>
      )}
      <span className={labelClassName}>{label}</span>
    </>
  );
  const item = path ? <Link to={path}>{content}</Link> : customLink ? <a {...customLink}>{content}</a> : content;
  const menuContent =
    children || customChildren ? (
      <Popover
        content={children || customChildren}
        trigger={'hover'}
        placement={'right'}
        getPopupContainer={(): HTMLElement => {
          return (containerRef && containerRef.current) || document.body;
        }}
      >
        {customChildren ? item : <span className={styles.menu_item}>{content}</span>}
      </Popover>
    ) : (
      item
    );

  return (
    <Menu.Item key={key} className={className} {...props}>
      {menuContent}
    </Menu.Item>
  );
};

export default SiderMenuItem;
