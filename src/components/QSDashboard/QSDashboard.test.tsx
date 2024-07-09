import React from 'react';
import { shallow } from 'enzyme';
import QSDashboard from './QSDashboard';

it('renders without crashing', () => {
  shallow(<QSDashboard />);
});
