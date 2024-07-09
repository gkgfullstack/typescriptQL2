import React from 'react';
import { shallow } from 'enzyme';
import ConfigureClientView from "./ConfigureClientView";

it('renders without crashing', () => {
    shallow(<ConfigureClientView />);
});