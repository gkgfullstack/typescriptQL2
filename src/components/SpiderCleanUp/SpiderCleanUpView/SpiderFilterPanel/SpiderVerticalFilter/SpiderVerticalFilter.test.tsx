import React from 'react';
import { shallow } from 'enzyme';
import SpiderVerticalFilter from "./SpiderVerticalFilter";

it('renders without crashing', () => {
    shallow(<SpiderVerticalFilter setParams={jest.fn} />);
});