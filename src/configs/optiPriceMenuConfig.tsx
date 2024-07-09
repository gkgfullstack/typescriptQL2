import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactComponent as QMatchIcon } from 'src/styles/ql2/assets/svg/qmatch-menu-icon.svg';
import routes from 'src/routes';
import { primaryMenuConfigItem } from './primaryMenuConfigItem';

const qmatchMenuConfig: Array<primaryMenuConfigItem> = [
  {
    label: 'Opti Price',
    path: routes.qmatchDashboard,
    icon: <QMatchIcon />,
    children: [
      {
        label: 'Product Finder',
        path: routes.productFinder,
        icon: <FontAwesomeIcon icon={['fal', 'search']} />,
      },
      {
        label: 'Audit History',
        path: routes.auditHistory,
        icon: <FontAwesomeIcon icon={['fal', 'history']} />,
      },
    ],
  },
 
];

export default qmatchMenuConfig;
