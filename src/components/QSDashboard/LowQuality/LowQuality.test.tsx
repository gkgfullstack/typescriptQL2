import React from 'react';
import { shallow } from 'enzyme';
import LowQuality from './LowQuality';

it('renders without crashing', () => {
  shallow(<LowQuality />);
});
