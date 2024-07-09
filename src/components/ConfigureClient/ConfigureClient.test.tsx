import React from 'react';
import { shallow } from 'enzyme';
import ConfigureClient from "./ConfigureClient";

it('renders without crashing', () => {
    shallow(<ConfigureClient />);
});