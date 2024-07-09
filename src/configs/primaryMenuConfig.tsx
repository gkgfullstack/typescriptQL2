import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactComponent as QSearchIcon } from 'src/assets/svg/qsearch-menu-icon.svg';
import { ReactComponent as QMatchIcon } from 'src/assets/svg/qmatch-menu-icon.svg';
import routes from 'src/routes';
import { primaryMenuConfigItem } from './primaryMenuConfigItem';

const primaryMenuConfig: Array<primaryMenuConfigItem> = [
  {
    label: 'Data Scout',
    path: routes.qSearchDashboard,
    icon: <QSearchIcon />, 
    children: [
      {
        label: 'Results',
        path: routes.results,
        icon: <FontAwesomeIcon icon={['fal', 'chart-bar']} />,
      },
      {
        label: 'Jobs',
        path: routes.jobSearch,
        icon: <FontAwesomeIcon icon={['fal', 'folder-open']} />,
      },
      {
        label: 'Active',
        path: routes.active,
        className: 'active',
        id: 'active',
        icon: <FontAwesomeIcon icon={['fal', 'sync']} />,
      },
      {
        label: 'Scheduled',
        path: routes.scheduled,
        className: 'scheduled',
        id:'scheduled',
        icon: <FontAwesomeIcon icon={['fal', 'clock']} />,
      },
      {
        label: 'Starred',
        path: routes.starred,
        className: 'starred',
        id:'starred',
        icon: <FontAwesomeIcon icon={['fas', 'star']} />,
      },
      {
        label: 'Archive',
        path: routes.archive,
        icon: <FontAwesomeIcon icon={['fal', 'archive']} />,
      },
      
      
    ],
  },
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

export default primaryMenuConfig;
