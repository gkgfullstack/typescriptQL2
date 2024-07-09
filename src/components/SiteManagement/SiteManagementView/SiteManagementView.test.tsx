import React from 'react';
import { shallow } from 'enzyme';
import SiteManagementView from "./SiteManagementView";

it('renders without crashing', () => {
    shallow(<SiteManagementView />);
});