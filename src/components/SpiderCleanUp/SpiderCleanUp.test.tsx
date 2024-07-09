import React from 'react';
import { shallow } from 'enzyme';
import SpiderCleanUp from "./SpiderCleanUp";

it('renders without crashing', () => {
    shallow(<SpiderCleanUp />);
});