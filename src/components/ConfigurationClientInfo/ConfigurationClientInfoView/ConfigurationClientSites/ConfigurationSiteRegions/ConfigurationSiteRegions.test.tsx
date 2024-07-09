import React from 'react';
import { shallow } from 'enzyme';
import ConfigurationSiteRegions from "./ConfigurationSiteRegions";

it('renders without crashing', () => {
    const region = {
        site: {
            name: "site name"
        },
        visible: true
    };
    shallow(<ConfigurationSiteRegions region={region} setRegion={jest.fn} />);
});