import React from 'react';
import { shallow } from 'enzyme';
import SiteManagement from "./SiteManagement";

it('renders without crashing', () => {
    shallow(<SiteManagement />);
});