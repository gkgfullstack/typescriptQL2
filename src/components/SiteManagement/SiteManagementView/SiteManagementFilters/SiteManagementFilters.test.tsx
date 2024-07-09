import React from 'react';
import { shallow } from 'enzyme';
import SiteManagementFilters from "./SiteManagementFilters";

it('renders without crashing', () => {
    shallow(<SiteManagementFilters setParams={jest.fn} />);
});