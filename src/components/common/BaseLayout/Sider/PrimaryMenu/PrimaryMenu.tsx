import React, { useState } from 'react';
import { Menu } from 'antd';
import clsx from 'clsx';
import { useAppStateContext } from 'src/stateProviders/useAppStateContext';
import styles from './PrimaryMenu.module.less';
import SiderMenuItem, { SiderMenuItemProps } from '../SiderMenuItem';
import qsearchMenuConfig from 'src/configs/qsearchMenuConfig';
import { primaryMenuConfigItem } from 'src/configs/primaryMenuConfigItem';
import optiPriceMenuConfig from 'src/configs/optiPriceMenuConfig';
import interActiveMenuConfig from 'src/configs/interActiveMenuConfig';
import optCenterMenuConfig from 'src/configs/optCenterMenuConfig';
import assortmentMenuConfig from 'src/configs/assortmentMenuConfig';

const SUB_MENU_ITEM_HORIZONTAL_OFFSET = 26;

const mapConfigToMenuItemProps = (
  config: Array<primaryMenuConfigItem>,
  parentKey: string,
  currentLevel: number
): SiderMenuItemProps[] =>
  config.flatMap(({ children, className, ...rest }, index) => {
    const newKey = parentKey + '_' + index;
    return [
      {
        ...rest,
        key: newKey,
        iconStyle: { marginLeft: currentLevel * SUB_MENU_ITEM_HORIZONTAL_OFFSET },
        className: clsx(styles.menu_item, className),
        iconClassName: clsx(styles.menu_item_icon, { [styles.menu_item_icon_0]: currentLevel === 0 }),
        labelClassName: styles.menu_item_label,
      },
      ...(children ? mapConfigToMenuItemProps(children, newKey, currentLevel + 1) : []),
    ];
  });

const getSelectedKeys = (configWithKeys: SiderMenuItemProps[],  pathName: string): string[] => {
  const nucleusPathName = '/nucleus';
  const foundItemProps = configWithKeys.find(({ path }) => {
    if (pathName.indexOf(nucleusPathName) > -1) {
      return path === nucleusPathName;
    }
    return path === pathName;
  });
  return foundItemProps ? [foundItemProps.key] : [];
};

type PrimaryMenuProps = {
  pathName: string;
  className: string;
};

const PrimaryMenu: React.FC<PrimaryMenuProps> = ({ pathName, className }: PrimaryMenuProps) => {
  const [menuItems, setMenuItems] = useState<SiderMenuItemProps[]>([]);
  //const [menuInteractive, setMenuInteractive] = useState<SiderMenuItemProps[]>([]);
  
  const { user } = useAppStateContext();
  React.useEffect(() => {
    setMenuItems([]);
    if (user && user.appPermissions) {
      if (user.appPermissions['enable_qmatch']) {
        setMenuItems(old => [...old, ...mapConfigToMenuItemProps(optiPriceMenuConfig, '0', 0)])
      }     
      if (user.appPermissions['enable_assortment']) {
        setMenuItems(old => [...old, ...mapConfigToMenuItemProps(assortmentMenuConfig, '1', 0)])
      }
      if (user.appPermissions['enable_qsearch']) {
        setMenuItems(old => [...old, ...mapConfigToMenuItemProps(qsearchMenuConfig, '2', 0)])
      } 
	   if (user.appPermissions['interactive_reports'] || user.appPermissions['enable_qmatch']) {
        setMenuItems(old => [...old, ...mapConfigToMenuItemProps(interActiveMenuConfig, '3', 0)])
      }
      if (user.appPermissions['enable_opsconsole']) {
        setMenuItems(old => [...old, ...mapConfigToMenuItemProps(optCenterMenuConfig, '4', 0)])
      }
  }
  }, [user]);
  return (
    <Menu
      theme="light"
      mode="inline"
      className={clsx(styles.primary_menu, className)}
      selectedKeys={getSelectedKeys(menuItems, pathName)}
    >
      {menuItems.map(({ key, ...props }) => (
        (user && user.appPermissions &&  !user.appPermissions['enable_assortment']
         && props.label==="Assortment") || (user && user.appPermissions &&  !user.appPermissions['enable_qmatch']
         && props.label==="Price Insights") || (user && user.appPermissions &&  !user.appPermissions['interactive_reports']
         && props.label==="Interactive Reports") ? (
           <span key={"assortment-menu-item"}></span>
        ):
        (
          <SiderMenuItem key={key} {...props} />
        )
      ))}
            
    </Menu>
    
  );
};

export default PrimaryMenu;
