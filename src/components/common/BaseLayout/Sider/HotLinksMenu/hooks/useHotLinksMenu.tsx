import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import routes from 'src/routes';
import UserInfo from 'src/types/UserInfo';
import UserDetailsMenu from '../UserDetailsMenu';
import HelpSubMenu from '../HelpSubMenu';

const findOutSelectedKeys = (pathName: string, config: SiderMenuNode[]): string[] => {
  const result = config.find(({ path }) => path === pathName);
  return result ? [result.key] : [];
};

export type SiderMenuNode = {
  key: string;
  label: string;
  icon?: JSX.Element;
  path?: string;
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
};

type ConfigItem = {
  label: string;
  icon?: JSX.Element;
  path?: string;
  className?: string;
  customLink?: object;
  onClick?: () => void;
  children?: React.ReactNode;
  childrenClassName?: string;
  customChildren?: object;
};

const composeInternalConfig = (userName: string, alertsCount: number, isUsagePageVisible: boolean): SiderMenuNode[] => {
  if (false) {
    console.log(alertsCount);
  }

  const config: ConfigItem[] = [
    {
      label: 'Help',
      customLink: {
        target: '_blank',
        href: 'https://www.ql2.com/knowledge-base/',
      },
      icon: <FontAwesomeIcon icon={['fal', 'question-circle']} />,
      children: <HelpSubMenu />,
    },
    {
      label: 'Usage',
      path: routes.usage,
      icon: <FontAwesomeIcon icon={['fal', 'chart-pie']} />,
      //customChildren: <UsageProgressTooltip />
    },
    {
      label: 'Settings',
      path: routes.settings,
      icon: <FontAwesomeIcon icon={['fal', 'cog']} />,
      //children: <SettingsSubMenu />,
    },
    {
      label: userName,
      icon: <FontAwesomeIcon icon={['fal', 'user-circle']} />,
      children: <UserDetailsMenu />,
    },
  ];

  const mapTo = (config: ConfigItem[]): SiderMenuNode[] => {
    return config
      .filter(item => (item.label === 'Usage' ? isUsagePageVisible : true))
      .map((entry, ind) => {
        return { ...entry, key: `${ind}` } as SiderMenuNode;
      });
  };
  return mapTo(config);
};

const getUsagePagePermissions = (user: UserInfo | null): boolean => {
  return !!(
    user &&
    (user.appPermissions['enable_usage'] ||
      user.appPermissions['usage_report_org/inputs'] ||
      user.appPermissions['usage_report_org/outputs'] ||
      user.appPermissions['usage_report_org/skus'])
  );
};

const useHotLinksMenu = (pathName: string, alertsCount: number, user: UserInfo | null): [SiderMenuNode[], string[]] => {
  const [config, setConfig] = useState<SiderMenuNode[]>([]);
  const userName = (user && user.userName) || '';
  const isUsagePageVisible = getUsagePagePermissions(user);

  useEffect(() => {
    if (userName) {
      const newConfig = composeInternalConfig(userName, alertsCount, isUsagePageVisible);
      if (JSON.stringify(newConfig) !== JSON.stringify(config)) {
        setConfig(newConfig);
      }
    }
  }, [userName, alertsCount, config, isUsagePageVisible]);
  return [config, findOutSelectedKeys(pathName, config)];
};

export default useHotLinksMenu;
