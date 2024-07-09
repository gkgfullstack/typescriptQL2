import React from 'react';
import { shallow } from 'enzyme';
import ProductCleanUp from "./ProductCleanUp";

it('renders without crashing', () => {
    shallow(<ProductCleanUp />);
});