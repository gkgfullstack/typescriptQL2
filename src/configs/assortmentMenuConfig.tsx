import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import routes from 'src/routes';
import { primaryMenuConfigItem } from './primaryMenuConfigItem';

const assortmentMenuConfig: Array<primaryMenuConfigItem> = [
  {
    label: 'Opti Mix',
    path: routes.assortment,
    className: 'ops-center',
    icon: <FontAwesomeIcon icon={['fal', 'shapes']} style={{fontSize:'18px'}} />,
  },
];

export default assortmentMenuConfig;
