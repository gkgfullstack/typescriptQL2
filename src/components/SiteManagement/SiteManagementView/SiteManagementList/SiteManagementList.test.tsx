import React from 'react';
import { shallow } from 'enzyme';
import SiteManagementList from './SiteManagementList';

it('renders without crashing', () => {
    shallow(<SiteManagementList />);
});