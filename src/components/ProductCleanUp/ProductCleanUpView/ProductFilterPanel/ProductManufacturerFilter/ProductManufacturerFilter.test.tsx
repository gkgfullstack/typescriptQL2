import React from 'react';
import { shallow } from 'enzyme';
import ProductManufacturerFilter from "./ProductManufacturerFilter";

it('renders without crashing', () => {
    shallow(<ProductManufacturerFilter setParams={jest.fn} />);
});