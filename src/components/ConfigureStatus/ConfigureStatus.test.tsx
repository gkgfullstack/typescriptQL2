import React from 'react';
import { shallow } from 'enzyme';
import ConfigureStatus from "./ConfigureStatus";

it('renders without crashing', () => {
    shallow(<ConfigureStatus />);
});