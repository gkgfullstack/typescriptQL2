import React from 'react';
import { shallow } from 'enzyme';
import ProductCleanUpView from "./ProductCleanUpView";

it('renders without crashing', () => {
    shallow(<ProductCleanUpView />);
});