import React from 'react';
import { shallow } from 'enzyme';
import QMDashboard from './QMDashboard';

it('renders without crashing', () => {
  shallow(<QMDashboard />);
});
