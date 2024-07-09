import React from 'react';
import { shallow } from 'enzyme';
import ShallowDateFilter from "./ShallowDateFilter";

it('renders without crashing', () => {
    shallow(<ShallowDateFilter setParams={jest.fn} />);
});