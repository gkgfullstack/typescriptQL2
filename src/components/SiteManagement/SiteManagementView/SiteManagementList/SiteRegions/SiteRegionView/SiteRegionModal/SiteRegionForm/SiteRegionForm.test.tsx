import React from 'react';
import { shallow } from 'enzyme';
import ConfigureSiteRegionForm from "./SiteRegionForm";

it('renders without crashing', () => {
    const site = {
        name: "site name",
        ID: "1"
    };
    const region = {};

    shallow(<ConfigureSiteRegionForm
        site={site}
        onSave={jest.fn}
        region={region}
    />);
});