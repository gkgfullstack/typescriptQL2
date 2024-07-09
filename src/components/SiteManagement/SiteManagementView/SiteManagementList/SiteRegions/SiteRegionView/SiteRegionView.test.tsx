import React from 'react';
import { shallow } from 'enzyme';
import SiteRegionView from "./SiteRegionView";

it('renders without crashing', () => {
    const site = {
        name: "site name"
    };
    shallow(<SiteRegionView site={site} />);
});