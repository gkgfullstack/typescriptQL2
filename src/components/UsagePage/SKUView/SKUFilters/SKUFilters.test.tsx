import React from 'react';
import { shallow } from 'enzyme';
import SKUFilters from "./SKUFilters";

it('renders without crashing', () => {
    shallow(<SKUFilters setParams={jest.fn} />);
});