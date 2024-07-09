import React from 'react';
import { shallow } from 'enzyme';
import ProductFilterPanel from "./ProductFilterPanel";

it('renders without crashing', () => {
    shallow(<ProductFilterPanel
        setParams={jest.fn}
        schema={'schema'}
        site={'site'}
    />);
});