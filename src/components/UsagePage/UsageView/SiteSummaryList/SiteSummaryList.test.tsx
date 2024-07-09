import React from 'react';
import { shallow } from 'enzyme';
import SiteSummaryList from './SiteSummaryList';

it('renders without crashing', () => {
    shallow(<SiteSummaryList />);
});
