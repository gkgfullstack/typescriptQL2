import React from 'react';
import { shallow } from 'enzyme';
import ProductVerticalFilter from "./ProductVerticalFilter";

it('renders without crashing', () => {
    shallow(<ProductVerticalFilter setParams={jest.fn} />);
});