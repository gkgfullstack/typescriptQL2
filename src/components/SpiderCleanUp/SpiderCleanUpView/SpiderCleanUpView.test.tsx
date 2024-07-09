import React from 'react';
import { shallow } from 'enzyme';
import SpiderCleanUpView from "./SpiderCleanUpView";

it('renders without crashing', () => {
    shallow(<SpiderCleanUpView />);
});