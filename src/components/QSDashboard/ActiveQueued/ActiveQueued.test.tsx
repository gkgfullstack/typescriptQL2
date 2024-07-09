import React from 'react';
import { shallow } from 'enzyme';
import ActiveQueued from './ActiveQueued';

it('renders without crashing', () => {
  shallow(<ActiveQueued />);
});
