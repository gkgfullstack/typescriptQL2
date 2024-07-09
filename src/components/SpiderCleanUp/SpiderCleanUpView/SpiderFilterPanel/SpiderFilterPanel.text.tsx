import React from 'react';
import { shallow } from 'enzyme';
import SpiderFilterPanel from './SpiderFilterPanel';

it('renders without crashing', () => {
  shallow(<SpiderFilterPanel schema={undefined} setParams={jest.fn} />);
});
