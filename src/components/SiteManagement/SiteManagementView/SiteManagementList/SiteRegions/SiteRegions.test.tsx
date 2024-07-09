import React from 'react';
import { shallow } from 'enzyme';
import SiteRegions from "./SiteRegions";

it('renders without crashing', () => {
    const region = {
        site: {
            name: "site name"
        },
        visible: true
    };
    shallow(<SiteRegions region={region} setRegion={jest.fn} />);
});