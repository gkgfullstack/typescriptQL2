import React from 'react';
import { shallow } from 'enzyme';
import ShallowCleanUp from "./ShallowCleanUp";

it('renders without crashing', () => {
    shallow(<ShallowCleanUp />);
});