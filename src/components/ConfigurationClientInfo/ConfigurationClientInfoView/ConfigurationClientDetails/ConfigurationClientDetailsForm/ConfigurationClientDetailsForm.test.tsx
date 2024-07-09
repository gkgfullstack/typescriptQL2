import React from 'react';
import { shallow } from 'enzyme';
import ConfigurationClientDetailsForm from "./ConfigurationClientDetailsForm";

it('renders without crashing', () => {
    const clientId = "1";
    shallow(<ConfigurationClientDetailsForm clientId={clientId} />);
});