import React from 'react';
import { shallow } from 'enzyme';
import ShallowCleanUpView from "./ShallowCleanUpView";

it('renders without crashing', () => {
    shallow(<ShallowCleanUpView />);
});