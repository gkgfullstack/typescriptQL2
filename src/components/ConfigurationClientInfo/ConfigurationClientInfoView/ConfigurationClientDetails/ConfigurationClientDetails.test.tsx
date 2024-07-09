import React from 'react';
import { shallow } from 'enzyme';
import ConfigurationClientDetails from "./ConfigurationClientDetails";

it('renders without crashing', () => {
    const clientId = "1";
    shallow(<ConfigurationClientDetails clientId={clientId} />);
});