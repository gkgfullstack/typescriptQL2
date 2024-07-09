import React from 'react';
import { shallow } from 'enzyme';
import UsageToggle from './UsageToggle';

it('renders without crashing', () => {
    shallow(<UsageToggle onUpdate={jest.fn} />);
});
