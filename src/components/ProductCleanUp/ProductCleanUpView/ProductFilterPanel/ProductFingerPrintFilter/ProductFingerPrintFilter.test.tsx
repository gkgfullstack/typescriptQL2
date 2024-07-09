import React from 'react';
import { shallow } from 'enzyme';
import ProductFingerPrintFilter from "./ProductFingerPrintFilter";

it('renders without crashing', () => {
    shallow(<ProductFingerPrintFilter
        setParams={jest.fn}
        schema={'schema'}
        site={'site'}
    />);
});