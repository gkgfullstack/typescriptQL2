import React from 'react';
import { shallow } from 'enzyme';
import ConfigurationSiteRegionView from "./ConfigurationSiteRegionView";

it('renders without crashing', () => {
    const site = {
        name: "site name"
    };
    shallow(<ConfigurationSiteRegionView site={site} />);
});