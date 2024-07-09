import React from 'react';
import { shallow } from 'enzyme';
import UsagePage from './UsagePage';

describe('UsagePage component', () => {
  it('renders without crashing', () => {
    shallow(<UsagePage />);
  });
});
