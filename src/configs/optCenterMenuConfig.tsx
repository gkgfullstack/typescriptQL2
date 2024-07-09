import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import routes from 'src/routes';
import { primaryMenuConfigItem } from './primaryMenuConfigItem';
import { faAtom } from '@fortawesome/pro-light-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
const faAtomPropIcon = faAtom as IconProp;

const optCenterMenuConfig: Array<primaryMenuConfigItem> = [
  {
    label: 'Nucleus',
    path: routes.optCenter,
    className: 'ops-center',
    icon: <FontAwesomeIcon icon={faAtomPropIcon} style={{fontSize:'16px'}} />,
  },
];

export default optCenterMenuConfig;
