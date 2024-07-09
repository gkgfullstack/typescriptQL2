import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import routes from 'src/routes';
import { primaryMenuConfigItem } from './primaryMenuConfigItem';
import { ReactComponent as InsightsIcon } from 'src/styles/ql2/assets/svg/insights-menu-icon.svg';

const interActiveMenuConfig: Array<primaryMenuConfigItem> = [
   {    
    label: 'My Insights',
    //path: routes.insights,<i class="fal fa-analytics"></i>
    icon: <FontAwesomeIcon icon={['fal', 'analytics']} size={'lg'}/>,
    children:[
      {
        label: 'Price Insights',
        path: routes.insights,
        icon: <InsightsIcon />,
      },
      {
        label: 'Interactive Reports',
        path: routes.Interactive,
        icon: <FontAwesomeIcon icon={['fal', 'chart-pie']} />,
      },
    ]
  },
  
];

export default interActiveMenuConfig;
