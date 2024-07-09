import React from 'react';
import { shallow } from 'enzyme';
import UsageSummaryFilter from './UsageSummaryFilter';

it('renders without crashing', () => {
    shallow(<UsageSummaryFilter onUpdate={jest.fn} />);
});