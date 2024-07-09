import React from 'react';
import { shallow } from 'enzyme';
import ShallowVerticalFilter from "./ShallowVerticalFilter";

it('renders without crashing', () => {
    shallow(<ShallowVerticalFilter setParams={jest.fn} />);
});