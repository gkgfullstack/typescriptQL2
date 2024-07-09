import React from 'react';
import { shallow } from 'enzyme';
import ConfigurationClientSites from "./ConfigurationClientSites";

it('renders without crashing', () => {
    const clientId = "1";
    shallow(<ConfigurationClientSites clientId={clientId} />);
});