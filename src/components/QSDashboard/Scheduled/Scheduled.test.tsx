import React from 'react';
import { shallow } from 'enzyme';
import Scheduled from './Scheduled';

it('renders without crashing', () => {
  shallow(<Scheduled />);
});
