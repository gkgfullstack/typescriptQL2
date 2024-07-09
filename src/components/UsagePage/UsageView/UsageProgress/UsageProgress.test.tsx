import React from 'react';
import { shallow } from 'enzyme';
import UsageProgress from './UsageProgress';

it('renders without crashing', () => {
    shallow(<UsageProgress />);
});
