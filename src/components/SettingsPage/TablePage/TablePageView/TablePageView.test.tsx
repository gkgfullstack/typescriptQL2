import React from 'react';
import { shallow } from 'enzyme';
import TablePageView from "./TablePageView";

it('renders without crashing', () => {
    shallow(<TablePageView />);
});