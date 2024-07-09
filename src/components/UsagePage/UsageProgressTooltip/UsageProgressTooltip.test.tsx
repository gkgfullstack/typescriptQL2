import React from 'react';
import { shallow } from 'enzyme';
import UsageProgressTooltip from './UsageProgressTooltip';

it('renders without crashing', () => {
    shallow(<UsageProgressTooltip />);
});