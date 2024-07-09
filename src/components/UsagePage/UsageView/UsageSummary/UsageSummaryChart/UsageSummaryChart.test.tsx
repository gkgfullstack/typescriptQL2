import React from 'react';
import { shallow } from 'enzyme';
import UsageSummaryChart from './UsageSummaryChart';

it('renders without crashing', () => {
    shallow(<UsageSummaryChart
        data={[]}
        id={'id'}
    />);
});
