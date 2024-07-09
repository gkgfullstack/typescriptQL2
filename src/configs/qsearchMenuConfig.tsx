import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactComponent as QSearchIcon } from 'src/styles/ql2/assets/svg/qsearch-menu-icon.svg';
import routes from 'src/routes';
import { primaryMenuConfigItem } from './primaryMenuConfigItem';


const qsearchMenuConfig: Array<primaryMenuConfigItem> = [
  {
    
    label: 'Data Scout',
    path: routes.qSearchDashboard,
    icon: <QSearchIcon/>,
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
        icon: <FontAwesomeIcon icon={['fal', 'sync']} />,
      },
      {
        label: 'Scheduled',
        path: routes.scheduled,
        className: 'scheduled',
        icon: <FontAwesomeIcon icon={['fal', 'clock']} />,
      },
      {
        label: 'Starred',
        path: routes.starred,
        className: 'starred',
        icon: <FontAwesomeIcon icon={['fas', 'star']} />,
      },
      {
        label: 'Archive',
        path: routes.archive,
        icon: <FontAwesomeIcon icon={['fal', 'archive']} />,
      },
   ],
  },  
];

export  default qsearchMenuConfig;
