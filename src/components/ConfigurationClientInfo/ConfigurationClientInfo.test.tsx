import React from 'react';
import { shallow } from 'enzyme';
import ConfigurationClientInfo from "./ConfigurationClientInfo";

it('renders without crashing', () => {
    shallow(<ConfigurationClientInfo />);
});